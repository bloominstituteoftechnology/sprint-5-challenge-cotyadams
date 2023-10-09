

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  document.querySelector('.info').textContent = 'No learner is selected'
  function createCard(id, fullName, email, mentors, mentorResult) {
    //create card div
    let card = document.createElement('div');
    card.classList.add('card');
    //create name div, giv unselected content
    let name = document.createElement('h3');
    name.textContent = fullName;
    //create email div
    let emailAddress = document.createElement('div');
    emailAddress.textContent = email;
    //create mentors h4 with class= 'closed'
    let mentor = document.createElement('h4');
    mentor.classList.add('closed');
    mentor.textContent = 'Mentors';
    
    //creat ul for mentor list
    let mentorList = document.createElement('ul');
    mentors.forEach((mentorID) => {
      for (let i = 0; i < mentorResult.data.length; i++) {
        if (mentorResult.data[i].id == mentorID) {
          let listNode = document.createElement('li');
          listNode.textContent = `${mentorResult.data[i].firstName} ${mentorResult.data[i].lastName}`;
          mentorList.appendChild(listNode);
        }
      }
                
    })
   
    //add click for mentors
    mentor.addEventListener('click', (event) => {
      mentor.classList.toggle('closed');
      mentor.classList.toggle('open');
      if (card.classList.contains('selected')) {
        event.stopPropagation();
      }
    })
    //add click function for whole card
    card.addEventListener('click', (event) => {
      //remove selected from all cards
      let isSelected = card.classList.contains('selected');
      document.querySelectorAll('.card').forEach((cardProxy) => {
          
        if (cardProxy.classList.contains('selected')) {
          cardProxy.classList.remove('selected');
          //reset ID
          let nameString = cardProxy.firstChild.textContent;
          let proxy = nameString.split(',');
          cardProxy.firstChild.textContent = proxy[0]
        }
        
      });
      name.textContent = `${fullName}, ID ${id}`
      if (isSelected && event.target.textContent == 'Mentors') {
        console.log('you clicked mentors');
      }
      else if (isSelected) {
        card.classList.remove('selected');
        name.textContent = fullName;
      }
      else if (!isSelected) {
        card.classList.add('selected')
      }
      
      //update p.info
      let selectedElement = document.querySelector('.selected');
      if (selectedElement) {
        let selectedName = selectedElement.firstChild.textContent
        selectedName = selectedName.split(',')
        document.querySelector('.info').textContent = `The selected learner is ${selectedName[0]}`
      }
      else {
        document.querySelector('.info').textContent = `No learner is selected`
      }
      
    })
    card.appendChild(name)
    card.appendChild(emailAddress)
    card.appendChild(mentor)
     card.appendChild(mentorList)
    return card;
  }
  
  axios
    .get('http://localhost:3003/api/learners'
    )
    .then((LearnerResult) => {
    
          
      {
        axios
          .get('http://localhost:3003/api/mentors')
          .then((mentorResult) => {
            for (let dataObj of LearnerResult.data) {
              let { id, fullName, email, mentors } = dataObj;
              //append card to site
              let card = createCard(id, fullName, email, mentors , mentorResult)
              document.querySelector('.cards').appendChild(card);
           }
            
          
          })
          .catch((err) => console.error(err))
          .finally(() => console.log('finally mentor'));
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
    console.log('finally learner');
  });
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
