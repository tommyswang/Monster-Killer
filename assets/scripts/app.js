const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife);

function playSound(s) {
  const sound = document.getElementById(s);
  sound.play();
}

function attackHandler() {
  if(currentMonsterHealth >= 0 && currentPlayerHealth >= 0) {
    const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    playSound('attack-btn-sound');
    currentMonsterHealth -= monsterDamage;
    currentPlayerHealth -= playerDamage;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
  } 
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', playSound);
healBtn.addEventListener('click', playSound);