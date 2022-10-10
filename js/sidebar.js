const showMenu = (toggleId, hahmp3Id)=>{
    const toggle=document.getElementById(toggleId),
    hahmp3=document.getElementById(hahmp3Id)
    if(toggle && hahmp3){
        toggle.addEventListener('click',()=>{
            hahmp3.classList.toggle('show')
            // toggle.classList.toggle('rotate')
        })

    }
}
showMenu('hah-toggle', 'hahmp3')
//avatar HA
const navuser = document.querySelector(".navuser.avatar");
const navuserPopul = document.querySelector(".navuser-popup__ul");
navuser.addEventListener("click", () => {navuserPopul.classList.add("active");});
document.addEventListener("click", function(evt) {
    let flyoutEl = navuser;
      targetEl = evt.target; // clicked element      
    do {
      if(targetEl == flyoutEl) {
       return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside.
    navuserPopul.classList.remove("active");
  });
