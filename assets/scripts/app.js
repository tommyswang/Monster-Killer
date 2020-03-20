const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
let hasBonusLife = true;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife);

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function playSound(s) {
  const sound = document.getElementById(s);
  sound.play();
}

function attackPlayer() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);

    alert('You would be dead but the bonus life saved you!');
  }
}

function attackMonster(mode) {
  let maxDamage;
  let modeSound;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    modeSound = 'attack-btn-sound';
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
    modeSound = 'strong-attack-btn-sound';
  }
  if(currentMonsterHealth > 0 && currentPlayerHealth > 0) {
    const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
    attackPlayer();
    playSound(modeSound);
    currentMonsterHealth -= monsterDamage;

  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
  } 
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }

}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if(currentMonsterHealth >= 0 && currentPlayerHealth >= 0) {
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE ) {
      healValue = chosenMaxLife - currentPlayerHealth;
    } else {
      healValue = HEAL_VALUE;
    }
    attackPlayer();
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    playSound('heal-btn-sound');
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);