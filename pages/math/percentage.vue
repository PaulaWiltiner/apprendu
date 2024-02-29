<template>
  <div v-if="!isScore" class="app-home">
    <Header>Porcentagem</Header>
    <ScrollableCards>
      <Content v-if="isContent" :content="contents[currentContentIndex]" />
      <Progress v-if="!isContent" :progress="progress" />
      <component
        v-if="!isContent"
        :is="questions[currentQuestionIndex].type"
        v-bind="questions[currentQuestionIndex].props"
        v-model:is-correct="questions[currentQuestionIndex].isCorrect"
        v-model:user-answer="questions[currentQuestionIndex].userAnswer"
      />
    </ScrollableCards>
    <Alert
      :title="alert.title"
      :text="alert.text"
      :isSuccess="alert.isSuccess"
      v-model:active="active"
      @advance="nextAlert"
    />
    <Footer
      :justify="!isContent ? 'center' : hasPrevious ? 'space-between' : 'right'"
    >
      <Button
        v-if="!isContent"
        @click="handleAnswer"
        :disabled="loading"
        :loading="loading"
        confirm
      >
        <p v-if="!loading" class="no-padding">Confirmar</p>
      </Button>
      <Button
        v-if="isContent && hasPrevious"
        @click="previousContent"
        previous
      ></Button>
      <Button v-if="isContent" @click="nextContent" next></Button>
    </Footer>
  </div>
  <Score
    v-else
    :score="score"
    route="/home"
    background="linear-gradient(45deg, #c3a5c2, #7ec4cf)"
  />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import ScrollableCards from "@/components/ScrollableCards.vue";
import Footer from "@/components/Footer.vue";
import Progress from "@/components/Progress.vue";
import Score from "@/components/Score.vue";
import Alert from "@/components/Alert.vue";
import Content from "@/components/Content.vue";
import OrderQuestion from "~/components/OrderQuestion.vue";
import AssociationQuestion from "@/components/AssociationQuestion.vue";
import FillInTheBlankQuestion from "@/components/FillInTheBlankQuestion.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import TrueFalseQuestion from "@/components/TrueFalseQuestion.vue";
import { useAI } from "@/composables/AIExplanation";
import { useAPI } from "@/composables/API";

const { sendAnswers } = useAPI();

const active = ref(false);
const alert = reactive({
  title: "",
  text: "",
  isSuccess: true,
});

const { getAIExplanation } = useAI();
const loading = ref<boolean>(false);

async function getAI(prompt: string) {
  return await getAIExplanation(prompt);
}

const isContent = ref(true);
const currentContentIndex = ref(0);
const hasPrevious = computed(() => currentContentIndex.value > 0);

const contents = reactive([
  `<h2><span style="color:#000000"><strong>Defini&ccedil;&atilde;o e Hist&oacute;ria</strong></span></h2>

<p style="margin-left:40px"><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/Design%20sem%20nome%20(2).png" style="height:400px; width:400px" /></p>

<p>Porcentagem &eacute; uma forma de representar uma parte de um todo em termos de 100 partes iguais <span style="color:#f39c76">(calma, vai ficar mais f&aacute;cil)</span></p>

<p>A porcentagem surgiu com o crescimento do com&eacute;rcio nos s&eacute;culos passados, ajudando os comerciantes a calcular <span style="color:#9266be"><strong>lucros</strong></span>, <span style="color:#678ac9"><strong>perdas</strong></span> e <span style="color:#ea5acb"><strong>descontos</strong></span>.</p>

<p>Dominar esta ferramenta ser&aacute; muito &uacute;til para suas finan&ccedil;as e investimentos pessoais.&nbsp;</p>
`,
  `<h2><strong>Porcentagem</strong></h2>

<p>Como j&aacute; vimos, a porcentagem &eacute; utilizada para representar uma parte de um todo. Ao terminar esse m&oacute;dulo, voc&ecirc; vai saber responder as seguintes perguntas:</p>

<table border="none" cellpadding="1" cellspacing="1" style="width:100%;border:none">
	<tbody>
		<tr>
			<td style="width:439px">
			<ul>
				<li>Uma loja possui 100 camisetas que est&atilde;o &agrave; venda. Sabendo que 60 camisetas s&atilde;o da cor branca. Qual &eacute; a porcentagem de camisetas brancas desta loja?&nbsp;</li>
			</ul>
			</td>
			<td style="width:336px"><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/Design%20sem%20nome%20(5).png" style="height:300px; width:300px" /></td>
		</tr>
		<tr>
			<td style="width:439px">
			<ul>
				<li>Se uma pessoa comeu 4 peda&ccedil;os de uma pizza que cont&eacute;m 8 peda&ccedil;os, qual &eacute; a porcentagem da pizza que esta pessoa comeu?</li>
			</ul>
			</td>
			<td style="width:336px"><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/Design%20sem%20nome%20(4).png" style="height:300px; width:300px" /></td>
		</tr>
	</tbody>
</table>
`,
  String.raw`<h2><strong>Como representar porcentagen</strong></h2>

<p>&nbsp;</p>

<p>O s&iacute;mbolo utilizado para representar uma porcentagem &eacute; o percentual: % <img src="https://ckeditor.com/apps/ckfinder/userfiles/files/Design%20sem%20nome%20(3).png" style="float:right; height:100px; width:100px" /></p>

<p style="text-align:center">$$ \text{X\%} = \dfrac{X}{100} $$</p>

<p>H&aacute; tr&ecirc;s formas de representar um valor percentual:</p>

<table border="1" style="border:1px solid gray; width:100%">
	<thead>
		<tr>
			<th style="text-align:center; width:137px"><span style="color:#4e5f70">Forma Percentual</span></th>
			<th style="text-align:center; width:142px"><span style="color:#4e5f70">Forma Fracion&aacute;ria</span></th>
			<th style="text-align:center; width:137px"><span style="color:#4e5f70">Forma Decimal</span></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="text-align:center; width:137px"><strong><span style="color:#f39c76">1%</span></strong></td>
			<td style="text-align:center; width:142px; height:60px;"><strong><span style="color:#f39c76;">$$ \dfrac{1}{100} $$</span></strong></td>
			<td style="text-align:center; width:137px"><strong><span style="color:#f39c76">0,01</span></strong></td>
		</tr>
		<tr>
			<td style="text-align:center; width:137px"><span style="color:#9266be"><strong>80%</strong></span></td>
			<td style="text-align:center; width:142px; height:60px;"><span style="color:#9266be"><strong>$$ \dfrac{80}{100} $$</strong></span></td>
			<td style="text-align:center; width:137px"><span style="color:#9266be"><strong>0,8</strong></span></td>
		</tr>
		<tr>
			<td style="text-align:center; width:137px"><strong><span style="color:#678ac9">25%</span></strong></td>
			<td style="text-align:center; width:142px; height:60px;"><span style="color:#678ac9">$$ \dfrac{25}{100} $$</span></td>
			<td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>0,25</strong></span></td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>Obs: Para encontrar a forma decimal de representa&ccedil;&atilde;o, basta realizar uma divis&atilde;o da parte pelo todo.</p>

<h4><span style="font-size:16px"><span style="color:#4e5f70"><strong>Por exemplo:</strong></span></span></h4>

<p>&nbsp;</p>

<table border="none" cellpadding="1" cellspacing="1" style="width:100%;border:none">
	<tbody>
		<tr>
			<td style="text-align:center">$$ \dfrac{1}{100} =\text{0,01} $$&nbsp;</td>
			<td style="text-align:center">&nbsp;&nbsp;&nbsp;$$ \dfrac{8}{100} =\text{0,08} $$</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>
`,
String.raw`<h2><strong>Mas como calcular uma porcentagem?</strong></h2>
<p>&nbsp;</p>

<p>Para calcular uma porcentagem, basta dividir a <strong>PARTE</strong> pelo <strong>TODO</strong> e <strong>multiplicar por 100</strong>.</p>

<p style="text-align:center"><span style="color:#9266be">$$ \text{Porcentagem} =\left(\dfrac {Parte}{Todo}\right) \times\ (100) $$</span></p>

<p><span style="color:#4e5f70"><strong>Relembrando o exemplo da loja de camisetas&hellip;</strong></span></p>

<p>&nbsp;</p>

<p>Se uma loja possui 100 camisetas e 60 s&atilde;o brancas, para calcularmos a porcentagem de camisetas brancas desta loja, vamos utilizar a f&oacute;rmula:</p>

<p style="text-align:center"><span style="color:#9266be">$$ \text{Porcentagem} =\left(\dfrac {Parte}{Todo}\right) \times\ (100) $$</span></p>

<table border="none" cellpadding="1" cellspacing="1" style="border:none; width:100%">
	<tbody>
		<tr>
			<td style="text-align:left; width:439px">
			<p>Sabemos que o <strong>TODO</strong> representa todas as camisetas da loja, que s&atilde;o 100 camisetas</p>

			<p>E a <strong>PARTE</strong> que queremos descobrir &eacute; relativa &agrave;s camisetas brancas, que s&atilde;o 60 camisetas</p>
			</td>
			<td style="text-align:left; width:336px"><br />
			<img src="https://ckeditor.com/apps/ckfinder/userfiles/files/3(1).png" style="height:280px; width:280px" /></td>
		</tr>
	</tbody>
</table>

<p style="text-align:center">&nbsp;</p>

<p>Portanto:</p>

<p>$$ \text{Porcentagem de camisetas brancas} =\left(\dfrac {Parte}{Todo}\right) \times\ 100 =\left(\dfrac {\text{Número de camisetas brancas}}{\text{Número total de camisas}}\right) \times\ 100 =\left(\dfrac {60}{100}\right) \times\ 100 = \text{60\%} $$</p>

<p>Portanto, a porcentagem de camisetas brancas &eacute; <span style="color:#f39c12"><span style="font-size:14px"><strong>60%</strong></span></span><span style="color:#678ac9"><span style="font-size:14px">.</span></span></p>

`,
String.raw`<h2><strong>Mais sobre Porcentagem</strong></h2>

<p>De forma gen&eacute;rica,</p>

<p style="text-align:center">$$ \text{X\% de A} =\left(\dfrac {X}{100}\right) \times\ A $$</p>

<table border="none" cellpadding="1" cellspacing="1" style="border:none; width:100%">
	<tbody>
		<tr>
			<td style="text-align:left; vertical-align:middle; width:439px">
			<p>Ou seja, X por cento de <strong>qualquer coisa</strong> &eacute; igual a X dividido por 100 multiplicado por esta qualquer coisa.</p>

			<p>Vamos ver com um caso real&hellip; Nos primeiros exerc&iacute;cios descobrimos que Gabriel comeu 50% de uma pizza de 8 peda&ccedil;os.</p>
			</td>
			<td style="text-align:right; width:336px"><br />
			<img src="https://ckeditor.com/apps/ckfinder/userfiles/files/Design%20sem%20nome%20(6).png" style="height:280px; width:280px" /></td>
		</tr>
	</tbody>
</table>

<p>Os dois dados que temos deste cen&aacute;rio s&atilde;o:</p>

<ul>
	<li>Gabriel comeu 50% da pizza</li>
	<li>A pizza tinha um total de 8 peda&ccedil;os</li>
</ul>

<p>Com essas informa&ccedil;&otilde;es, podemos determinar quantos pedaços de pizza foram comidos por Gabriel <span style="color:#f39c12">(&eacute; a an&aacute;lise inversa &agrave; que tivemos antes)</span>:</p>

<p>$$ \text{Quantidade de pedaços comidos por gabriel} = \text{50\% de 8} =\left(\dfrac {50}{100}\right) \times\ 8 = \text{4 pedaços} $$</p>

`
]);

function nextContent() {
  if (currentContentIndex.value === contents.length - 1) {
    isContent.value = false;
  }
  if (currentContentIndex.value < contents.length - 1) {
    currentContentIndex.value++;
  }
}

function previousContent() {
  if (currentContentIndex.value > 0) {
    currentContentIndex.value--;
  }
}

function generatePrompt(
  questionCommand: any,
  correctAnswer: any,
  userAnswer: any,
  options?: any
) {
  let prompt = "";

  if (questions[currentQuestionIndex.value].isCorrect) {
    prompt = `Preciso que dê uma curiosidade sobre a questão que o estudante acertou em no máximo 65 caracteres, seguindo o contexto: a questão é ${questionCommand}, ${
      options ? "opções: " + options : ""
    } a resposta correta é ${correctAnswer} e a resposta do estudante foi ${userAnswer}.Use na resposta 'Curiosidade: '`;
  } else {
    prompt = `Dê uma pista criativa e sucinta para auxiliar o estudante na questão em até 65 caracteres, sem revelar a resposta direta, com base nas informações: ${questionCommand}, ${
      options ? "opções: " + options : ""
    }, resposta correta: ${correctAnswer}, resposta do estudante: ${userAnswer}. Inclua 'Dica:' na resposta.`;
  }

  return prompt;
}

async function nextAlert() {
  if (questions[currentQuestionIndex.value].userAnswerIsCorrect) {
    correctQuestions.value.push(currentQuestionIndex.value);
  }
  if (currentQuestionIndex.value === questions.length - 1) {
    let answers = {};
    for (let i = 0; i < questions.length; i++) {
      answers = {
        ...answers,
        [questions[i].name]: correctQuestions.value.includes(i),
      };
    }
    await sendAnswers(answers);
    isScore.value = true;
  }
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  }
}

const correctOrder = ref([
  "Primeiro",
  "Segundo",
  "Terceiro",
  "Quarto",
  "Quinto",
]);

const order = ref(["Terceiro", "Primeiro", "Quarto", "Segundo", "Quinto"]);

const isScore = ref(false);

const items = reactive([
  {
    value1: "/img/android.svg",
    value2: "android",
  },
  {
    value1: "/img/apple.png",
    value2: "apple",
  },
  {
    value1: "/img/mcdonalds.png",
    value2: "mcdonalds",
  },
  {
    value1: "/img/google.png",
    value2: "google",
  },
]);

const correctMatch = ref([
  {
    leftCardIndex: 0,
    rightCardIndex: 0,
  },
  {
    leftCardIndex: 1,
    rightCardIndex: 1,
  },
  {
    leftCardIndex: 2,
    rightCardIndex: 2,
  },
  {
    leftCardIndex: 3,
    rightCardIndex: 3,
  },
]);

const questions = reactive([
  {
    type: OrderQuestion,
    name: "OrderQuestion",
    props: {
      questionText: "Ordene corretamente na vertical",
      correctAnswer: correctOrder.value,
      options: order.value,
      background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 2,
    userAnswer: null,
  },
  {
    isAssociationQuestion: true,
    type: AssociationQuestion,
    name: "AssociationQuestion",
    props: {
      options: items.map((item) => ({
        ...item,
        isStretching: false,
        startX: null,
        startY: null,
        endX: null,
        endY: null,
        lineStyle: {
          width: "5px",
          transform: "rotate(0deg)",
          transformOrigin: "0% 0%",
        },
      })),
      questionText: "Ligue os pontos corretamente",
      correctAnswer: correctMatch.value,
      background: "#9f98ba",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 1,
    userAnswer: null,
  },
  {
    type: TrueFalseQuestion,
    name: "TrueFalseQuestion",
    props: {
      question: "Analise a sentença abaixo:",
      questionText: "A água ferve a 100°C.",
      correctAnswer: "true",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 7,
    userAnswer: "",
  },
  {
    type: FillInTheBlankQuestion,
    name: "FillInTheBlankQuestion",
    props: {
      question: "Complete a frase:",
      questionText:
        "O DNA é a sigla para Ácido Desoxirribonucleico, uma molécula que carrega a informação genética em ______.",
      answerType: "text",
      correctAnswer: "organismos",
      options: ["animais", "vegetais", "organismos", "microorganismos"],
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 5,
    userAnswer: null,
  },
  {
    type: MultipleChoice,
    name: "MultipleChoice",
    props: {
      question: "Qual é a capital do Brasil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      correctAnswer: "Brasília",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 8,
    userAnswer: null,
  },
  {
    type: FillInTheBlankQuestion,
    name: "FillInTheBlankQuestion",
    props: {
      question: "Preencha o espaço em branco com o ano:",
      questionText:
        "A Declaração de Independência dos Estados Unidos foi assinada em ______.",
      answerType: "number",
      correctAnswer: "1776",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 3,
    userAnswer: null,
  },
]);

let currentQuestionIndex = ref(0);
let correctQuestions = ref<number[]>([]);

const progress = computed(
  () => ((currentQuestionIndex.value + 1) / questions.length) * 100
);

async function handleAnswer() {
  loading.value = true;
  const questionText = `${
    questions[currentQuestionIndex.value].props.question ?? " "
  } ${questions[currentQuestionIndex.value].props.questionText ?? " "}`;
  let _correctAnswer =
    questions[currentQuestionIndex.value].props.correctAnswer;
  let _options = questions[currentQuestionIndex.value].props.options;
  if (questions[currentQuestionIndex.value].isAssociationQuestion) {
    _options = items.map((item) => JSON.stringify(item));
    _correctAnswer = correctMatch.value.map(
      ({ leftCardIndex, rightCardIndex }) => {
        const leftItem =
          items[leftCardIndex].value1 ?? items[leftCardIndex].value1;
        const rightItem =
          items[rightCardIndex].value2 ?? items[rightCardIndex].value2;
        return JSON.stringify({
          leftItem,
          rightItem,
        });
      }
    );
  }
  const prompt = generatePrompt(
    questionText,
    _correctAnswer,
    questions[currentQuestionIndex.value].userAnswer,
    _options
  );

  const text: string = await getAI(prompt);
  if (questions[currentQuestionIndex.value].isCorrect) {
    alert.title = "Parabéns!!";
    alert.text = text ?? "";
    alert.isSuccess = true;
    active.value = true;
    loading.value = false;
  } else {
    questions[currentQuestionIndex.value].userAnswerIsCorrect = false;
    alert.title = "Não foi dessa vez.";
    alert.text = text ?? "";
    alert.isSuccess = false;
    active.value = true;
    loading.value = false;
  }
}

function calculateScore(correctQuestions: number[]) {
  let totalWeight = 0;

  for (const index of correctQuestions) {
    if (index >= 0 && index < questions.length) {
      const question = questions[index];
      if (question.hasOwnProperty("weight")) {
        const weight = question.weight;
        totalWeight += weight;
      }
    }
  }

  if (totalWeight === 0) {
    return 0;
  }

  return totalWeight;
}

const score = computed(() => calculateScore(correctQuestions.value));
</script>

<style>
.no-padding {
  padding: 0px;
  margin: 0px;
}
</style>
