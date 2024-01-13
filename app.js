function getRandomNumber(max, min) {
   return Math.floor(Math.random()* (max - min)) + min;
};


const app = Vue.createApp({
  data() {
    return {
       playerHealth: 100,
       monsterHealth: 100,
       currentRound: 0,
       winner: null
    }
  },

  computed: {
      MonsterBarStyles() {
        if(this.monsterHealth < 0){
          return { width: '0%'};
        }
        return {
          width: this.monsterHealth + '%'
        };
      },

      PlayerBarStyle() {
        if(this.playerHealth < 0){
          return { width: '0%'};
        }
        return {
          width: this.playerHealth + '%'
        };
      },

      mayUseSpecialAttack() {
        return this.currentRound % 3 !== 0;
      }
  },

  watch: {
      playerHealth(value) {
        if(value <= 0 && this.monsterHealth <= 0) {
          // A draw
          this.winner = 'draw';
        } else if(value <= 0) {
          //  Player lost
          this.winner = 'monster';
        }
      }, 

      monsterHealth(value) {
        if(value <= 0 && this.playerHealth <= 0) {
          // A draw
          this.winner = 'draw';
        } else if(value <= 0) {
          //  Monster lost
          this.winner = 'player';
        }
      }
  },

  methods: { 
    newGame() {
        this.playerHealth = 100,
        this.monsterHealth = 100,
        this.winner = null,
        this.currentRound = 0
    },

    attackMonster() {
      this.currentRound++;
        const attackValue = getRandomNumber(12, 5);
        this.monsterHealth -= attackValue;
        this.attackPlayer();
    },

    attackPlayer() {
        const attackValue = getRandomNumber(15, 8);
        this.playerHealth -= attackValue;
    },

    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(20, 10);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(20, 8);
      if (this.playerHealth + healValue > 100 ) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },

    surrender() {
      this.winner = 'monster';
    }

  }




});

app.mount('#game');