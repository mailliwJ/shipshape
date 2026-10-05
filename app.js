const STORAGE_KEY = 'shipshape-progress-v1';
const taskNames = ['idea', 'build', 'repo', 'push', 'deploy', 'install'];
const groups = {chat:['idea','build'],github:['repo','push'],android:['deploy','install']};
let state = loadState();
const boxes = [...document.querySelectorAll('.task')];
const toast = document.querySelector('#toast');
let toastTimer;
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{};}catch{return {};}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));render();}
function render(){let done=0;for(const card of boxes){const name=card.dataset.task;const checked=Boolean(state[name]);card.classList.toggle('done',checked);card.querySelector('.check').checked=checked;if(checked)done++;}document.querySelector('#progressLabel').textContent=`${done} of ${taskNames.length}`;document.querySelector('#progressBar').style.width=`${done/taskNames.length*100}%`;for(const [group,names] of Object.entries(groups)){document.querySelector(`#count${group[0].toUpperCase()+group.slice(1)}`).textContent=`${names.filter(name=>state[name]).length}/${names.length}`;}}
function announce(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2100);}
boxes.forEach(card=>card.querySelector('.check').addEventListener('change',event=>{state[card.dataset.task]=event.target.checked;save();if(event.target.checked)announce('Nice. One step closer to shipped.');}));
document.querySelector('#resetButton').addEventListener('click',()=>{state={};save();announce('Demo progress reset.');});
let installPrompt;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;const button=document.querySelector('#installButton');button.hidden=false;button.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;button.hidden=true;});});
window.addEventListener('appinstalled',()=>announce('Shipshape is on your home screen.'));
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
