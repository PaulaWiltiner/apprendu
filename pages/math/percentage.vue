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
import PuzzleQuestion from "@/components/PuzzleQuestion.vue";

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

<p style="text-align:center"><img src="/img/history_percentage.png" style="height:auto; width:100%" /></p>

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
			<td style="width:336px"><img src="/img/shopping.png" style="height:auto; width:100%" /></td>
		</tr>
		<tr>
			<td style="width:439px">
			<ul>
				<li>Se uma pessoa comeu 4 peda&ccedil;os de uma pizza que cont&eacute;m 8 peda&ccedil;os, qual &eacute; a porcentagem da pizza que esta pessoa comeu?</li>
			</ul>
			</td>
			<td style="width:336px"><img src="/img/pizza.png"" style="height:auto; width:100%" /></td>
		</tr>
	</tbody>
</table>
`,
  String.raw`<h2><strong>Como representar porcentagem</strong></h2>

<p>&nbsp;</p>

<p>O s&iacute;mbolo utilizado para representar uma porcentagem &eacute; o percentual: <img src="/img/percentage.png" style="float:right; height:auto; width:100px" /></p>

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
			<img src="/img/owner_shopping.png" style="height:auto; width:100%" /></td>
		</tr>
	</tbody>
</table>

<p style="text-align:center">&nbsp;</p>

<p>Portanto:</p>

<p>$$ \text{\%\ de camisetas brancas} =\left(\dfrac {Parte}{Todo}\right) \times\ 100  $$</p>

<p>E, trocando os valores, vamos obter:</p>

<p>$$ \left(\dfrac {\text{Nº camisetas brancas}}{\text{Nº total de camisetas}}\right) \times\ 100  =\left(\dfrac {60}{100}\right) \times\ 100 = \text{60\%}  $$</p>

<p>Portanto, a porcentagem de camisetas brancas &eacute; <span style="color:#f39c12"><span style="font-size:14px"><strong>60%</strong></span></span><span style="color:#678ac9"><span style="font-size:14px">.</span></span></p>

`,
  String.raw`<h2><strong>Mais sobre Porcentagem</strong></h2>

  <p>Para terminar com a teoria…</p>

<p>De forma gen&eacute;rica,</p>

<p style="text-align:center">$$ \text{X\% de A} =\left(\dfrac {X}{100}\right) \times\ A $$</p>

<table border="none" cellpadding="1" cellspacing="1" style="border:none; width:100%">
	<tbody>
		<tr>
			<td style="text-align:left; vertical-align:middle; width:439px">
			<p>Ou seja, X por cento de <strong>qualquer coisa</strong> &eacute; igual a X dividido por 100 multiplicado por esta qualquer coisa.</p>

			<p>Vamos ver com um caso real&hellip; Considere a situação: Gabriel se reuniu com seus amigos e comeu 50% de uma pizza de 8 pedaços.</p>
			</td>
			<td style="text-align:right; width:336px"><br />
			<img src="/img/eat_pizza.png" style="height:auto; width:100%" /></td>
		</tr>
	</tbody>
</table>

<p>Os dois dados que temos deste cen&aacute;rio s&atilde;o:</p>

<ul>
	<li>Gabriel comeu 50% da pizza</li>
	<li>A pizza tinha um total de 8 peda&ccedil;os</li>
</ul>

<p>Com essas informações, podemos determinar quantos pedaços de pizza foram comidos por Gabriel, valor que chamaremos de X. O cálculo é o seguinte: <span style="color:#f39c12">(&eacute; a an&aacute;lise inversa &agrave; que tivemos antes)</span>:</p>

<p>$$ \text{X} = \text{50\% de 8} =\left(\dfrac {50}{100}\right) \times\ 8 = \text{4 pedaços} $$</p>

`,
]);

function nextContent() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Para uma animação suave, se suportado
  });
  if (currentContentIndex.value === contents.length - 1) {
    isContent.value = false;
  }
  if (currentContentIndex.value < contents.length - 1) {
    currentContentIndex.value++;
  }
}

function previousContent() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Para uma animação suave, se suportado
  });
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
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Para uma animação suave, se suportado
  });
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
    value1: String.raw`$$ \text{25\%} $$`,
    value2: String.raw`$$ \dfrac {50}{100} $$`,
  },
  {
    value1: String.raw`$$ \text{50\%} $$`,
    value2: String.raw`$$ \dfrac {3}{100} $$`,
  },
  {
    value1: String.raw`$$ \text{3\%} $$`,
    value2: String.raw`$$ \dfrac {25}{100} $$`,
  },
  {
    value1: String.raw`$$ \text{100\%} $$`,
    value2: String.raw`$$ \dfrac {100}{100} $$`,
  },
]);

const correctMatch = ref([
  {
    leftCardIndex: 0,
    rightCardIndex: 2,
  },
  {
    leftCardIndex: 1,
    rightCardIndex: 0,
  },
  {
    leftCardIndex: 2,
    rightCardIndex: 1,
  },
  {
    leftCardIndex: 3,
    rightCardIndex: 3,
  },
]);

const questions = reactive([
  {
    isAssociationQuestion: true,
    type: AssociationQuestion,
    name: "Associação - Porcentagem",
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
      questionText: "Associe as formas percentuais com as formas fracionárias.",
      correctAnswer: correctMatch.value,
      background: "#9f98ba",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 1,
    userAnswer: null,
    tip: "Erros são oportunidades de aprendizado, continue tentando, você está progredindo! Tente se lembrar da tabela das formas percentual, fracionária e decimal.",
    curiosity: "Continue se dedicando para alcançar os seus sonhos!",
  },
  {
    type: PuzzleQuestion,
    name: "Quebra-cabeça - Porcentagem",
    props: {
      options: [
        {
          text: "Nº de pedaços de pizza",
          width: "auto",
          height: "40px",
          clicked: true,
        },
        { text: "8", width: "auto", height: "40px" },
        { text: "10", width: "auto", height: "40px" },
        { text: "4", width: "auto", height: "40px" },
        { text: "100", width: "auto", height: "40px" },
        { text: "50%", width: "auto", height: "40px" },
        { text: "40%", width: "auto", height: "40px" },
        { text: "100", width: "auto", height: "40px" },
        {
          text: "Nº de pedaços comidos pelo Gabriel",
          width: "auto",
          height: "40px",
          clicked: true,
        },
      ],
      questionText:
        "Alguns amigos se reuniram para comer uma pizza no feriado. A pizza foi dividida em 8 pedaços iguais. Se Gabriel comeu sozinho 4 pedaços, qual a porcentagem da pizza que ele comeu? <p>&nbsp;</p>",
      correctAnswer: {
        fristFraction: [
          "Nº de pedaços comidos pelo Gabriel",
          "Nº de pedaços de pizza",
        ],
        fristMultiplier: ["100"],
        secondFraction: ["4", "8"],
        secondMultiplier: ["100"],
        result: ["50%"],
      },
      userAnswer: {
        fristFraction: [null, null],
        fristMultiplier: [null],
        secondFraction: [null, null],
        secondMultiplier: [null],
        result: [null],
      },
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 2,
    userAnswer: null,
    tip: String.raw`Lembre-se de dividir a PARTE pelo TODO, e multiplicar o resultado desta divisão por 100. $$ \text{Porcentagem} =\left(\dfrac {Parte}{Todo}\right) \times\ 100 $$`,
    curiosity: "Continue se dedicando para alcançar os seus sonhos!",
  },
  {
    type: MultipleChoice,
    name: "Multipla Escolha - Salário - Parte 1",
    props: {
      question: "Salário - 1",
      questionText: `<p>Se uma pessoa investe mensalmente 30% de seu sal&aacute;rio de R$ 1.000,00, quantos reais s&atilde;o investidos por m&ecirc;s?</p>

        <p style="color:#9266be">Vamos resolver esta quest&atilde;o por partes&hellip;</p>

        <p>Primeiro, selecione a express&atilde;o correta para resolver o problema:</p> `,
      options: [
        String.raw`$$ \text{Investimento mensal} = 30\%  \text{ de } 1000 = 30 \times\ 100 $$`,
        String.raw`$$ \text{Investimento inicial} = 30\% \text { de } 1000 = \left(\dfrac {30}{100}\right) \times\ 1000 $$`,
        String.raw`$$ \text{Investimento inicial} = 30\% \text { de } 1000 = \left(\dfrac {0,3}{100}\right) \times\ 1000 $$`,
        String.raw`$$ \text{Investimento inicial} = 30\% \text { de } 1000 = 30 \times\ 1000 $$`,
      ],
      correctAnswer: String.raw`$$ \text{Investimento inicial} = 30\% \text { de } 1000 = \left(\dfrac {30}{100}\right) \times\ 1000 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 3,
    userAnswer: null,
    tip: String.raw`Lembre-se de converter a porcentagem para forma fracionária, dividindo por 100, antes de multiplicar pelo salário. $$ \text{X\% de A} = \left(\dfrac {X}{100}\right) \times\ A $$`,
    curiosity:
      "Porcentagem é muito utilizada para lidar com finanças em geral!",
  },
  {
    type: FillInTheBlankQuestion,
    name: "Preencha o espaço em branco - Salário - Parte 2",
    props: {
      question: "Salário - 2",
      questionText: String.raw`<p>Se uma pessoa investe mensalmente 30% de seu sal&aacute;rio de R$ 1.000,00, quantos reais s&atilde;o armazenados por m&ecirc;s?</p>

      <p>&Oacute;timo! Agora que encontramos a express&atilde;o correta para resolver este problema, precisamos encontrar o resultado final.</p>

      <p style="color:#4e5f70">$$ \text{Investimento inicial} = 30\% \text { de } 1000 = \left(\dfrac {30}{100}\right) \times\ 1000 = \text ? $$</p>

      <p style="color:#678ac9">Obs: Use uma calculadora se achar necess&aacute;rio.</p>`,
      answerType: "number",
      correctAnswer: "300",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 4,
    userAnswer: null,
    tip: `Certifique-se de multiplicar corretamente a porcentagem pelo salário para calcular o investimento mensal.`,
    curiosity: "Continue se dedicando para alcançar os seus sonhos!",
  },
  {
    type: MultipleChoice,
    name: "Multipla Escolha - Preço da Casa - Parte 1",
    props: {
      question: "Preço da Casa - 1",
      questionText: `<p>O pre&ccedil;o m&eacute;dio das casas de um bairro &eacute; R$ 100.000,00 (cem mil reais). Se uma certa casa est&aacute; com o pre&ccedil;o de venda 20% maior que a m&eacute;dia do bairro, qual &eacute; o pre&ccedil;o desta casa?</p>

      <p>Vamos resolver esta quest&atilde;o por partes&hellip;</p>

      <ul>
        <li><span style="color:#f39c12"><strong>Primeiro</strong></span>, como o pre&ccedil;o desta casa &eacute; <strong>20%</strong> maior que a <strong>m&eacute;dia das casas do bairro</strong>, vamos calcular quanto &eacute; 20% de 100.000.</li>
        <li>Com esta etapa conclu&iacute;da, vamos ent&atilde;o <strong>somar</strong> este valor no <strong>pre&ccedil;o m&eacute;dio das casas do bairro</strong>.</li>
      </ul>

      <p>Assinale a alternativa que cont&eacute;m a express&atilde;o E o resultado correto para calcular 20% da m&eacute;dia do bairro:</p>`,
      options: [
        String.raw`$$ 20\% \text{ de }\ 100.000 = \left(\dfrac {20\times\ 100}{20}\right) = 100 $$`,
        String.raw`$$ 20\% \text{ de }\ 100.000 = \left(\dfrac {20}{100}\right) \times 100.000 = 2000 $$`,
        String.raw`$$ 20\% \text{ de }\ 100.000 = 20\times\ 100 = 2000 $$`,
        String.raw`$$ 20\% \text{ de }\ 100.000 = \left(\dfrac {20}{100}\right) \times 100.000 = 20.000 $$`,
      ],
      correctAnswer: String.raw`$$ 20\% \text{ de }\ 100.000 = \left(\dfrac {20}{100}\right) \times 100.000 = 20.000 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 5,
    userAnswer: null,
    tip: `Lembre-se da expressão para obter X% de qualquer número, e se atente com as contas realizadas.`,
    curiosity:
      "Análises deste tipo são muito usadas no nosso dia a dia, como por exemplo “a gasolina está X% mais cara que o etanol”.",
  },
  {
    type: MultipleChoice,
    name: "Multipla Escolha - Preço da Casa - Parte 2",
    props: {
      question: "Preço da Casa - 2",
      questionText: `<p>O preço médio das casas de um bairro é R$ 100.000,00. Se uma certa casa está com o preço de venda 20% maior que a média do bairro, qual é o preço desta casa?</p>

      <p style="color:#9266be">Muito bem! Como esta casa é R$ 20.000,00 mais cara do que a média das casas do bairro, só resta calcularmos o preço dela.</p>

      <p>Selecione a alternativa que contém a expressão E o resulto que nos dará o preço da casa:</p>`,
      options: [
        String.raw`$$ \dfrac {100.000}{20.000} + 100.000 = 100.005 $$`,
        String.raw`$$ 100.000 + 20.000 = 120.000 $$`,
        String.raw`$$ 100.000 - 20.000 = 80.000 $$`,
        String.raw`$$ \dfrac{100.000 \times\ 20.000}{100} = 20.000.000 $$`,
      ],
      correctAnswer: String.raw`$$ 100.000 + 20.000 = 120.000 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 6,
    userAnswer: null,
    tip: `Lembre-se de adicionar o acréscimo ao preço médio das casas para encontrar o preço da casa específica.`,
    curiosity:
      "Observe que se a casa fosse 20% mais barata do que o preço médio do bairro, ao invés de somar o valor, teríamos que subtrair.",
  },
  {
    type: MultipleChoice,
    name: "Pisa - Fábricas - Parte 1",
    props: {
      question: "Questão do PISA (adaptada) - 1",
      questionText: `<p>Duas empresas fabricantes de celulares realizam testes di&aacute;rios em suas linhas de produ&ccedil;&atilde;o para verificar se os aparelhos est&atilde;o funcionando corretamente. Aqueles que apresentam defeitos s&atilde;o retirados e enviados para conserto.</p>

      <p>A tabela abaixo cont&eacute;m os valores obtidos por cada empresa:</p>

      <table border="1" style="border:1px solid gray; width:100%">
        <thead>
          <tr>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Fabricante</span></th>
            <th style="text-align:center; width:142px"><span style="color:#4e5f70">N&uacute;mero de celulares f&aacute;bricados por dia</span></th>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Porcentagem de celulares defeituosos por dia</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>Fabricante A</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><span style="color:#9266be"><strong>4000</strong></span></td>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>3%</strong></span></td>
          </tr>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>Fabricante B</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><strong><span style="color:#678ac9">9000</span></strong></td>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>5%</strong></span></td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Um cliente quer comprar seu celular da empresa que fabrica menos celulares defeituosos por dia, por confiar mais em seu processo produtivo. Ajude este cliente a realizar esta an&aacute;lise.</p>

      <p>Para identificar qual fabricante possui menos defeitos, o cliente deve:</p>`,
      options: [
        `Olhar unicamente para a empresa que possui o menor percentual de celulares defeituosos por dia, pois esta empresa produz menos celulares defeituosos no geral.`,
        `Calcular a quantidade de celulares defeituosos fabricados em cada uma das empresas e comparar os valores.`,
      ],
      correctAnswer: `Calcular a quantidade de celulares defeituosos fabricados em cada uma das empresas e comparar os valores.`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 7,
    userAnswer: null,
    tip: `Estruturar a resolução de um exercício é uma parte essencial para desenvolver seu raciocínio.`,
    curiosity:
      "Não podemos olhar unicamente para o percentual de celulares defeituosos para esta análise, pois a quantidade de celulares produzidos vai interferir nesta análise. Observe, por exemplo, que 1% de 1000 é igual a 10, e 5% de 100 é igual a 5.",
  },
  {
    type: MultipleChoice,
    name: "Pisa - Fábricas - Parte 2",
    props: {
      question: "Questão do PISA (adaptada) - 2",
      questionText: `<p>Duas empresas fabricantes de celulares realizam testes di&aacute;rios em suas linhas de produ&ccedil;&atilde;o para verificar se os aparelhos est&atilde;o funcionando corretamente. Aqueles que apresentam defeitos s&atilde;o retirados e enviados para conserto.</p>

      <p>A tabela abaixo cont&eacute;m os valores obtidos por cada empresa:</p>

      <table border="1" style="border:1px solid gray; width:100%">
        <thead>
          <tr>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Fabricante</span></th>
            <th style="text-align:center; width:142px"><span style="color:#4e5f70">N&uacute;mero de celulares f&aacute;bricados por dia</span></th>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Porcentagem de celulares defeituosos por dia</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>Fabricante A</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><span style="color:#9266be"><strong>4000</strong></span></td>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>3%</strong></span></td>
          </tr>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>Fabricante B</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><strong><span style="color:#678ac9">9000</span></strong></td>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>5%</strong></span></td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

     <p><strong>Vamos ent&atilde;o calcular a quantidade de aparelhos defeituosos em cada uma das empresas.</strong></p>

    <p>Qual &eacute; a quantidade de aparelhos defeituosos produzidos no Fabricante A?</p>`,
      options: [
        String.raw`$$ \left(\dfrac {3\% \text{ de}\ 4000}{100}\right) = \left(\dfrac {\dfrac{3}{100} \times 4000}{100}\right) = 1,2 $$`,
        String.raw`$$ 5\% \text{ de }\ 9000 = \left(\dfrac {5}{100}\right) \times 9000 = 450 $$`,
        String.raw`$$ 3\% \text{ de }\ 4000 = \left(\dfrac {3}{100}\right) \times 4000 = 120 $$`,
        String.raw`$$ 3\% \text{ de }\ 4000 = \left(\dfrac {3 \times 100}{4000}\right) = 0,075 $$`,
      ],
      correctAnswer: String.raw`$$ 3\% \text{ de }\ 4000 = \left(\dfrac {3}{100}\right) \times 4000 = 120 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 8,
    userAnswer: null,
    tip: `Para acertar esta questão, lembre-se de que precisamos do percentual de produtos defeituosos por dia da fábrica A, e da quantidade de aparelhos produzidos por dia. O produto destes dois valores nos dará a quantidade de aparelhos com defeitos em um dia.`,
    curiosity:
      "A fábrica A produz em média 120 aparelhos com defeitos por dia. Análises como esta são muito utilizadas no dia a dia das empresas.",
  },
  {
    type: MultipleChoice,
    name: "Pisa - Fábricas - Parte 3",
    props: {
      question: "Questão do PISA (adaptada) - 3",
      questionText: `<p>Duas empresas fabricantes de celulares realizam testes di&aacute;rios em suas linhas de produ&ccedil;&atilde;o para verificar se os aparelhos est&atilde;o funcionando corretamente. Aqueles que apresentam defeitos s&atilde;o retirados e enviados para conserto.</p>

      <p>A tabela abaixo cont&eacute;m os valores obtidos por cada empresa:</p>

      <table border="1" style="border:1px solid gray; width:100%">
        <thead>
          <tr>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Fabricante</span></th>
            <th style="text-align:center; width:142px"><span style="color:#4e5f70">N&uacute;mero de celulares f&aacute;bricados por dia</span></th>
            <th style="text-align:center; width:137px"><span style="color:#4e5f70">Porcentagem de celulares defeituosos por dia</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>Fabricante A</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><span style="color:#9266be"><strong>4000</strong></span></td>
            <td style="text-align:center; width:137px"><span style="color:#9266be"><strong>3%</strong></span></td>
          </tr>
          <tr>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>Fabricante B</strong></span></td>
            <td style="height:60px; text-align:center; width:142px"><strong><span style="color:#678ac9">9000</span></strong></td>
            <td style="text-align:center; width:137px"><span style="color:#678ac9"><strong>5%</strong></span></td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

     <p><strong>Agora basta calcularmos a quantidade de aparelhos defeituosos no Fabricante B e comparar os valores.</strong></p>

    <p>Qual é a quantidade de aparelhos defeituosos produzidos no Fabricante B?</p>`,
      options: [
        String.raw`$$ 5\% \text{ de }\ 9000 = \left(\dfrac {5 \times 100}{9000}\right) = 0,05 $$`,
        String.raw`$$ 5\% \text{ de }\ 9000 = \left(\dfrac {5}{100}\right) \times 9000 = 450 $$`,
        String.raw`$$ 5\% \text{ de }\ 9000 = \left(\dfrac {3}{100}\right) \times 9000 = 270 $$`,
        String.raw`$$ \left(\dfrac {5\% \text{ de}\ 4000}{100}\right) = \left(\dfrac {\dfrac{5}{100} \times 4000}{100}\right) = 2 $$`,
      ],
      correctAnswer: String.raw`$$ 5\% \text{ de }\ 9000 = \left(\dfrac {5}{100}\right) \times 9000 = 450 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 9,
    userAnswer: null,
    tip: `São produzidos 9 mil aparelhos por dia no Fabricante B. Precisamos descobrir quantos destes são defeituosos. Sabemos que 5% dos aparelhos do Fabricante B são defeituosos. Então precisamos calcular quanto é 5% de 9000.`,
    curiosity:
      "Como a fábrica A produz em média 120 aparelhos com defeitos e a fábrica B produz em média 450 aparelhos com defeitos, este cliente vai preferir comprar da fábrica A.",
  },
  {
    type: MultipleChoice,
    name: "Pisa - óleo diesel - Parte 1",
    props: {
      question: "Questão do PISA (adaptada) - 1",
      questionText: `<p>Devido ao alto custo de &oacute;leo diesel, os propriet&aacute;rios do navio Nova Onda est&atilde;o pensando em equipar seu navio com uma <em>kite sail</em>, uma esp&eacute;cie de vela que auxilia o deslocamento do navio pela for&ccedil;a do vento. Calcula-se que uma <em>kite sail</em> tenha o potencial para reduzir o consumo de diesel em cerca de 20%.</p>

      <img src="/img/new_wave.png" style="height:auto; width:100%" /></td>

      <p>&nbsp;</p>

      <p>Qual ser&aacute; o novo consumo de <em>diesel</em> do navio Nova Onda ap&oacute;s a compra do <em>kite sail</em>?</p>

      <p>Selecione a alternativa que cont&eacute;m o passo a passo correto para resolver este problema.</p>
     `,
      options: [
        `Para achar a resposta, preciso calcular quanto é 20% de 3.500.000 litros e subtrair este valor obtido de 3.500.000 litros.`,
        `Para achar a resposta, preciso calcular quanto é 20% de 3.500.000 litros e somar este valor obtido em 3.500.000 litros.`,
        `Para achar a resposta, preciso calcular quanto é 20% de 12.000 tons e subtrair este valor obtido de 12.000 tons.`,
      ],
      correctAnswer: `Para achar a resposta, preciso calcular quanto é 20% de 3.500.000 litros e subtrair este valor obtido de 3.500.000 litros.`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 5,
    userAnswer: null,
    tip: `Precisamos calcular o novo consumo de diesel pelo navio. Com a kite sail o navio vai ter uma redução de consumo em 20%. Precisamos então calcular quanto é 20% do consumo atual de diesel (3.500.000 litros), e subtrair o valor encontrado do consumo atual de diesel.`,
    curiosity: "Porcentagem é muito utilizada para análises como esta.",
  },
  {
    type: MultipleChoice,
    name: "Pisa - óleo diesel - Parte 2",
    props: {
      question: "Questão do PISA (adaptada) - 2",
      questionText: `<p>Devido ao alto custo de &oacute;leo diesel, os propriet&aacute;rios do navio Nova Onda est&atilde;o pensando em equipar seu navio com uma <em>kite sail</em>, uma esp&eacute;cie de vela que auxilia o deslocamento do navio pela for&ccedil;a do vento. Calcula-se que uma <em>kite sail</em> tenha o potencial para reduzir o consumo de diesel em cerca de 20%.</p>

      <img src="/img/new_wave.png" style="height:auto; width:100%" /></td>

      <p>&nbsp;</p>

      <p>Qual ser&aacute; o novo consumo de <em>diesel</em> do navio Nova Onda ap&oacute;s a compra do <em>kite sail</em>?</p>

      <p>Selecione a alternativa que contém a expressão E o valor do novo consumo de diesel pelo navio.</p>

      <p style="color:#678ac9">Obs: para facilitar as contas, utilizaremos o valor 3,5 milhões ao invés de 3.500.000. </p>
     `,
      options: [
        String.raw`$$ 3,5 - 20\% \text{ de }\ 3,5 = 3,5 - \left(\dfrac {20}{100}\right) \times 3,5 = 3,5 - 0,7 = 2,8 $$`,
        String.raw`$$ 3,5 + 20\% \text{ de }\ 3,5 = 3,5 + \left(\dfrac {20}{100}\right) \times 3,5 = 3,5 + 0,7 = 4,2 $$`,
        String.raw`$$ 20\% \text{ de }\ 3,5 = \left(\dfrac {20}{100}\right) \times 3,5 = 0,7 $$`,
      ],
      correctAnswer: String.raw`$$ 3,5 - 20\% \text{ de }\ 3,5 = 3,5 - \left(\dfrac {20}{100}\right) \times 3,5 = 3,5 - 0,7 = 2,8 $$`,
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 6,
    userAnswer: null,
    tip: `Precisamos encontrar o novo consumo de combustível. O consumo atual é de 3,5 milhões de litros de diesel. Como o consumo vai diminuir em 20%, precisamos calcular quanto é 20% de 3,5 milhões, e subtrair o valor encontrado de 3,5 milhões. Obs: se o consumo por algum motivo aumentasse, precisaríamos somar o valor obtido no valor total.`,
    curiosity:
      "O novo consumo é de 2.800.000 litros de diesel. O navio passa a economizar 700 mil litros de combustível.",
  },
]);

// {
//     type: MultipleChoice,
//     name: "Multipla Escolha - Pizza",
//     props: {
//       questionText:
//         "Alguns amigos se reuniram para comer uma pizza no feriado. A pizza foi dividida em 8 pedaços iguais. Se Gabriel comeu sozinho 4 pedaços, qual a porcentagem da pizza que ele comeu? <p>&nbsp;</p>",
//       options: [
//         String.raw`$$ \dfrac {\text{Nº de pedaços comidos pelo Gabriel } \times\ 100 }{100} = \dfrac {4 \times\ 100}{100} = \text{4\%} $$`,
//         String.raw`$$ \left( \dfrac {\text{Nº de pedaços de pizza}}{\text{Nº de pedaços comidos pelo Gabriel}} \right) \times\ 100 = \left(\dfrac {8}{4} \right) \times\ 100 = \text{200\%} $$`,
//         String.raw`$$ \left( \dfrac {\text{Nº de pedaços comidos pelo Gabriel}}{\text{Nº de pedaços de pizza}} \right) \times\ 100 = \left(\dfrac {4}{8} \right) \times\ 100 = \text{50\%} $$`,
//         String.raw`$$ \dfrac {\text{Nº de pedaços comidos pelo Gabriel}}{\text{Nº de pedaços de pizza}}= \dfrac {4}{8} = \text{0,5} $$`,
//       ],
//       correctAnswer: String.raw`$$ \left( \dfrac {\text{Nº de pedaços comidos pelo Gabriel}}{\text{Nº de pedaços de pizza}} \right) \times\ 100 = \left(\dfrac {4}{8} \right) \times\ 100 = \text{50\%} $$`,
//     },
//     isCorrect: false,
//     userAnswerIsCorrect: true,
//     weight: 2,
//     userAnswer: null,
//     tip: String.raw`Lembre-se de dividir a PARTE pelo TODO, e multiplicar o resultado desta divisão por 100. $$ \text{Porcentagem} =\left(\dfrac {Parte}{Todo}\right) \times\ 100 $$`,
//     curiosity: "Continue se dedicando para alcançar os seus sonhos!",
//   },

// {
//     type: OrderQuestion,
//     name: "OrderQuestion",
//     props: {
//       questionText: "Ordene corretamente na vertical",
//       correctAnswer: correctOrder.value,
//       options: order.value,
//       background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
//     },
//     isCorrect: false,
//     userAnswerIsCorrect: true,
//     weight: 2,
//     userAnswer: null,
//   },
//   {
//     type: TrueFalseQuestion,
//     name: "TrueFalseQuestion",
//     props: {
//       question: "Analise a sentença abaixo:",
//       questionText: "A água ferve a 100°C.",
//       correctAnswer: "true",
//     },
//     isCorrect: false,
//     userAnswerIsCorrect: true,
//     weight: 7,
//     userAnswer: "",
//   },
//   {
//     type: FillInTheBlankQuestion,
//     name: "FillInTheBlankQuestion",
//     props: {
//       question: "Complete a frase:",
//       questionText:
//         "O DNA é a sigla para Ácido Desoxirribonucleico, uma molécula que carrega a informação genética em ______.",
//       answerType: "text",
//       correctAnswer: "organismos",
//       options: ["animais", "vegetais", "organismos", "microorganismos"],
//     },
//     isCorrect: false,
//     userAnswerIsCorrect: true,
//     weight: 5,
//     userAnswer: null,
//   },
//   {
//     type: FillInTheBlankQuestion,
//     name: "FillInTheBlankQuestion",
//     props: {
//       question: "Preencha o espaço em branco com o ano:",
//       questionText:
//         "A Declaração de Independência dos Estados Unidos foi assinada em ______.",
//       answerType: "number",
//       correctAnswer: "1776",
//     },
//     isCorrect: false,
//     userAnswerIsCorrect: true,
//     weight: 3,
//     userAnswer: null,
//   },

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
  // const prompt = generatePrompt(
  //   questionText,
  //   _correctAnswer,
  //   questions[currentQuestionIndex.value].userAnswer,
  //   _options
  // );

  // const text: string = await getAI(prompt);
  if (questions[currentQuestionIndex.value].isCorrect) {
    alert.title = "Parabéns!!";
    alert.text = questions[currentQuestionIndex.value].curiosity ?? "";
    alert.isSuccess = true;
    active.value = true;
    loading.value = false;
  } else {
    questions[currentQuestionIndex.value].userAnswerIsCorrect = false;
    alert.title = "Não foi dessa vez.";
    alert.text = questions[currentQuestionIndex.value].tip ?? "";
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
