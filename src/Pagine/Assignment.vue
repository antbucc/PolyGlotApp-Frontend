<template>


<div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style=" margin: auto; font-size:0.9vw">
      <form
        action=""
        class="
          form
          flex flex-col
          bg-white
          p-6
          lg:rounded-xl
          justify-center
        "
        style=" text-align:center;  width:30vw; height:30vw"
      >
        <div class="quiz-header"> <!-- Header della card -->
      <img src="../../public/logo.png" alt="PolyGlot">
      </div>

      <div class="step-progress" :style="{'width': progress + '%'}"></div> <!-- Barra di progresso del quiz -->

      <div
        class="quiz-main" 
      > <!-- Parte principale del quiz, con domanda e risposte -->
        <div class="box-question"> <!-- Box della domanda dentro la card -->
          <b><h1>Here will be displayed a question </h1></b> <!-- Pesca la domanda da quelle definite, poi le pescheremo da db -->
        
        </div>
        <div class="box-answers"> <!-- Box delle risposte alla suddetta domanda -->
          <ul>
            <li></li> <!-- Uso li vuoto come linea di divisione tra domanda e risposte -->
            <li
            > <!-- Pesco le risposte dalle domande e controllo se sono corrette o meno; se cliccate me lo dirà -->
              answer1  <!-- Aggiunte grafiche per risposte corrette o non, mettere prossimo x tic e cross <div class="fas fa-check" v-if="select ? ans.correct: ''"></div><div class="fas fa-times" v-if="select ? !ans.correct: ''"></div>-->
            </li>
            <li>answer2</li>
            <li>answer3</li>
            <li>answer4</li>
          </ul>
        </div>
      </div>
      <div class="box-score" v-if="score_show"> <!-- Box del punteggio SOLO quando sono finite le domande -->
        <h2>Punteggio:</h2>
        <h2>{{ score }}/{{ questions.length }}</h2>
        <div class="btn-class"> <!-- Bottone per andare alla classifica SOLO quando sono finite le domande -->
          <button  @click="$router.push('classifica')">Classifica</button>
        </div>
      </div>
      <div class="quiz-footer" > <!-- Parte ai piedi della card, in cui avrò il bottone per procedere di domanda , da aggiungere poi  v-if="score_show == false" -->
        <div class="box-button" > <!-- Ci sarà bottone solo se il quiz non sarà completo, da aggiungere poi v-if="progress < 100"-->
          <button  :style="next ? 'background-color:#0890d3' : '' ">Avanti</button> <!-- da aggiungere poi @click="nextQuestion" -->
        </div>
      </div>


      </form>
    </div>
  </div>




</template>

<script>
export default {
  name: "Assignment",
  created() {
    this.$store.dispatch("storePage", { title: "Assignment", back: false });
  }
};
</script>

<style></style>
