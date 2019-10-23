/* esl/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

/*

Propiedades a llenar

"source": "${payload.bodyTemplate2Data.image.sources[0].url}",
"source": "${payload.bodyTemplate2Data.backgroundImage.sources[0].url}",
"source": "${payload.bodyTemplate2Data.image.sources[0].url}",

"headerTitle": "${payload.bodyTemplate2Data.title}",
"headerAttributionImage": "${payload.bodyTemplate2Data.logoUrl}"
"footerHint": "${payload.bodyTemplate2Data.hintText}"
"text": "<b>${payload.bodyTemplate2Data.textContent.primaryText.title}</b>"
"text": "${payload.bodyTemplate2Data.textContent.primaryText.text}",
"text": "<b>${payload.bodyTemplate2Data.textContent.title.text}</b>",
"text": "${payload.bodyTemplate2Data.textContent.primaryText.text}",

Imagenes

LogoAzul:     http://s2.subirimagenes.com/imagen/previo/thump_9900532logoazul.png     https://i.imgur.com/KLvM3rR.png
LogoBlanco:   http://s2.subirimagenes.com/imagen/previo/thump_9900533logoblanco.png   
LogoVino:     http://s2.subirimagenes.com/imagen/previo/thump_9900534logovino.png     
LogoNegro:    http://s2.subirimagenes.com/imagen/previo/thump_9900535logonegro.png    
LogoDurazno:  http://s2.subirimagenes.com/imagen/previo/thump_9900536logodurazno.png  
*/

const WelcomeHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const factArr = data;
      const factIndex = Math.floor(Math.random() * factArr.length);
      const randomFact = factArr[factIndex];
      const speechOutput = WELCOME_MESSAGE + GET_FACT_MESSAGE + randomFact + ' ' + FALLBACK_REPROMPT;
      const context = handlerInput.requestEnvelope.context;
      const factFontSize = 35 - (randomFact.length - 69)/16;
  
      if(JSON.stringify(context.System.device.supportedInterfaces) === APL_Property)
        return handlerInput.responseBuilder
          .speak(speechOutput)
          .addDirective({
                  type: 'Alexa.Presentation.APL.RenderDocument',
                  version: '1.0',
                  document: require('./main.json'),
                  datasources: {
                    "bodyTemplate2Data":{
                      "title" : SKILL_NAME,
                      "logoUrl" : "https://i.imgur.com/KLvM3rR.png",
                      "hintText" : "Intenta con: Alexa, dime un dato nutricional.",
                      "textContent" : {
                        "title" : {
                          "text" : SKILL_NAME
                        },
                        "primaryText" : {
                          "title" : GET_FACT_MESSAGE,
                          "text" : randomFact,
                          "size" : factFontSize
                        }
                      },
                      "image" : {
                        "sources" : [
                          {
                            "url" : imagesData[factIndex]
                          }
                        ]
                      },
                      "backgroundImage" : {
                        "sources" : [
                          {
                            "url" : "https://i.imgur.com/vImVMeL.jpg"
                          }
                        ]
                      }
                    }
                  }
              })
          .reprompt(FALLBACK_REPROMPT)
          .getResponse();
      else
          return handlerInput.responseBuilder
          .speak(speechOutput)
          .withSimpleCard(SKILL_NAME, randomFact)
          .reprompt(HELP_REPROMPT)
          .getResponse();
    },
  };
  
  const GetNewFactHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
          && request.intent.name === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput =GET_FACT_MESSAGE_AGAIN + randomFact + ' ' + FALLBACK_REPROMPT;
        const context = handlerInput.requestEnvelope.context;
        const factFontSize = 35 - (randomFact.length - 69)/16;
    
        if(JSON.stringify(context.System.device.supportedInterfaces) === APL_Property)
          return handlerInput.responseBuilder
            .speak(speechOutput)
            .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: require('./main.json'),
                    datasources: {
                      "bodyTemplate2Data":{
                        "title" : SKILL_NAME,
                        "logoUrl" : "https://i.imgur.com/KLvM3rR.png",
                        "hintText" : "Intenta con: Alexa, dime un dato nutricional.",
                        "textContent" : {
                          "title" : {
                            "text" : SKILL_NAME
                          },
                          "primaryText" : {
                            "title" : GET_FACT_MESSAGE_AGAIN,
                            "text" : randomFact,
                            "size" : factFontSize
                          }
                        },
                        "image" : {
                          "sources" : [
                            {
                              "url" : imagesData[factIndex]
                            }
                          ]
                        },
                        "backgroundImage" : {
                          "sources" : [
                            {
                              "url" : "https://i.imgur.com/vImVMeL.jpg"
                            }
                          ]
                        }
                      }
                    }
                })
            .reprompt(FALLBACK_REPROMPT)
            .getResponse();
        else
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomFact)
            .reprompt(HELP_REPROMPT)
            .getResponse();
    },
  };

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(ERROR_MESSAGE)
      .reprompt(ERROR_MESSAGE)
      .getResponse();
  },
};

const WELCOME_MESSAGE = 'Hola, bienvenido a nutriasistente: ';
const SKILL_NAME = 'NutriAsistente';
const GET_FACT_MESSAGE = 'Aqui tienes un dato nutricional: ';
const GET_FACT_MESSAGE_AGAIN = 'Aqui tienes otro dato nutricional: ';
const HELP_MESSAGE = 'Puedes decirme que te cuente algún dato, o, puedes decir salir... ¿Con qué puedo ayudarte?';
const HELP_REPROMPT = '¿Con qué puedo ayudarte?';
const FALLBACK_MESSAGE = 'La skill de NutriAsistente no puede ayudarte con eso. Te puede ayudar proporcionandote datos y consejos de nutrición si dices dime un dato nutricional. ¿Con qué puedo ayudarte?';
const FALLBACK_REPROMPT = '¿Con qué más puedo ayudarte?';
const STOP_MESSAGE = '¡Hasta la próxima!';
const ERROR_MESSAGE = 'Lo siento, ha ocurrido un error';

const APL_Property = '{"Alexa.Presentation.APL":{"runtime":{"maxVersion":"1.0"}}}';

const data = [
  'Controla la cantidad de sal en tus comidas. Sustitúyela por hierbas aromáticas, limón o especias que aporten un toque de sabor a tus platillos.',
  'Realiza entre cuatro y cinco comidas al día. De esta forma, estarás comiendo menos cantidad de alimentos, pero aumentarás la frecuencia de ingestión, lo cual mejorará la eficiencia del metabolismo y evitará que aparezca el hambre.',
  'Consume un mínimo de cinco raciones de frutas y verduras por día. Aportan vitaminas, minerales, agua y fibra, además de que contienen pocas calorías, grasas, sodio y nada de colesterol. El reparto ideal consiste en tres piezas de fruta y dos raciones de verdura.',
  'Cocina siempre con aceite de oliva, mejorará tu salud cardiovascular.',
  'No salgas sin desayunar. Quince minutos son más que suficientes. Recargarás tu organismo de energía para afrontar el día de la mejor manera física y psicológica. Un desayuno completo debe estar compuesto por lácteos, cereales y fruta.',
  'No te obsesiones con las calorías que debes consumir. Cada individuo tiene necesidades propias. Si la báscula no se mueve, es porque estás tomando las que necesitas.',
  'Consume pescado azul (arenque, atún) dos o tres veces a la semana. Es rico en ácidos grasos Omega- 3, nutrientes esenciales que tu organismo requiere, pero que no genera por sí mismo.',
  'Los lácteos deben estar presentes en nuestra alimentación diaria, pues son una excelente fuente de nutrientes: proteínas, calcio y vitaminas (A, D, B12 y ácido fólico). El calcio es un mineral esencial para prevenir la osteoporosis y mantener fuerte la estructura ósea y los dientes. Por ello, los expertos recomiendan la ingesta diaria de entre dos y cuatro raciones de alimentos lácteos.',
  'Las legumbres (alubias, lentejas, garbanzos, etcétera) son una de las principales fuentes de hidratos de carbono y proteínas de origen vegetal. También cuentan con un bajo nivel de grasa. Lo recomendable es consumir, al menos, dos o tres raciones por semana.',
  'Según la Organización Mundial de la Salud, las grasas deben cubrir entre 30% y 35% de nuestras necesidades energéticas diarias. Sin embargo, las grasas saturadas no deberían suponer más de 7% de dicha aportación.',
  'No guardes en tu casa alimentos tentadores. Te evitarás problemas graves.',
  'Si te dan ganas, puedes darte el lujo de comer un helado una vez a la semana, siempre y cuando este no contenga más de 300 calorías. La hora de la cena es el mejor momento para.',
  'Reserva los pasteles para ocasiones especiales. Y, aun así, cómelos con moderación.',
  'Los hidratos de carbono deben proporcionar alrededor de 50% del aporte energético diario. ¿Dónde encontrarlos? En la pasta, el arroz o el pan. Siempre es preferible tomar estos alimentos en su variante integral debido a su mayor contenido en fibra. También puedes encontrar este tipo de nutrientes tanto en las papas como en las legumbres.',
  'Las proteínas tienen que suministrar entre 10% y 15% de las calorías totales necesarias. Combina las de origen animal y vegetal.',
  'El hierro es un nutriente esencial. Para que no te falte, come una vez a la semana carnes rojas, mariscos o paté. Si eres vegetariano, opta por legumbres, cereales o frutos secos y combínalos con un postre a base de naranja, kiwi, fresas o toronja, pues la vitamina C ayuda a absorber mejor el hierro.',
  'Las verduras asadas (berenjena, pimiento, espárragos, etcétera) o al horno son una excelente alternativa, tanto para primer plato como para guarnición del segundo.',
  'La práctica del ejercicio físico activa nuestro metabolismo y genera la producción de radicales libres. Combate esta reacción tomando alimentos ricos en vitaminas antioxidantes, como frutas, verduras, hortalizas y frutos secos.',
  'Un buen plan de alimentación debe ser equilibrado y acorde con tu estilo de vida y tus actividades. Evita la monotonía en tu dieta e incluye todos los grupos de alimentos. Cuida, eso sí, las proporciones y las cantidades.',
  'Intenta no quedarte en casa cuando estés aburrido o angustiado. La forma más simple de desahogar ambos sentimientos es comiendo.',
  'Si padeces de alto colesterol, añade a tu dieta alimentos con esteroles vegetales (margarinas, bebidas lácteas y yogurts). Te ayudarán a reducir entre 10% y 15% en sólo tres semanas, siempre y cuando mantengas una alimentación balanceada que incluya frutas y verduras. Si estás tomando medicamentos para disminuir el colesterol, lo mejor es que consultes a tu médico.',
  'Controla el nivel de azúcar en tu sangre. La diabetes afecta negativamente el funcionamiento de tu sistema cardiovascular.',
  'Para untar sobre el pan, opta por el aceite de oliva o la margarina. Las principales marcas de ésta no contienen ácidos grasos trans, pero sí grasas insaturadas, beneficiosas para la salud.',
  'Es importante involucrar a todos los miembros de la familia en las actividades relacionadas con la alimentación: ir al súper, preparar y cocinar los alimentos, etcétera.',
  'La comida debe proporcionar 35% de la energía diaria necesaria. Una buena sopa a base de verduras es un primer plato muy recomendable por su efecto saciante.',
  'Si tienes tendencia a comer entre comidas, opta por tomar una pieza de fruta o un té.',
  'Las frutas secas, como los duraznos, ciruelas, pasas, higos, dátiles y uvas pasas, son una fuente rica en fibra y ayudan a regular el tránsito mental.',
  'El vegetarianismo no implica dejar de consumir alimentos de origen animal. Esto puede provocar un déficit de hierro y de algunas vitaminas, como la B12. Para suplir esta peligrosa carencia, come alimentos ricos en dicho mineral, como pueden ser las legumbres, los cítricos y los suplementos de vitamina B12.',
  'Un exceso de hidratos de carbono en nuestra dieta suele duplicar los depósitos de glucógeno del músculo. Si bien este efecto aumenta la resistencia del mismo, únicamente es provechoso en el caso de los atletas de largo rendimiento, como los corredores de maratón o los ciclistas y los esquiadores de fondo.',
  'Puedes comer un huevo al día sin riesgo para tu corazón. Es rico en vitaminas y proteínas.',
  'No recurras a una dieta drástica para adelgazar. Las llamadas “dietas milagro” únicamente consiguen que pierdas líquidos, por lo que recuperas los kilos en cuanto las abandonas. Es el famoso “rebote” o “yoyo”.',
  'Si te gustan los aguacates, consúmelos con moderación, ya que tienen un alto contenido graso.',
  'La fibra es un componente clave en nuestra alimentación. Lo recomendable es ingerir entre 25 y 30 gramos diarios.',
  'Las vitaminas son nutrientes esenciales, pero la mayoría no las fabrica nuestro organismo. Y, cuando sí lo hace, es de manera insuficiente para cubrir sus propias necesidades. Para prevenir manifestaciones carenciales, es preciso llevar una dieta variada y rica en todo tipo de vitaminas.',
  'Para mejorar la salud cardiovascular es recomendable consumir habitualmente un puñado de frutos secos, como nueces o almendras.',
  'El ayuno total prolongado es muy peligroso. Además de someter al cuerpo a situaciones de estrés, aparecen serias carencias nutricionales.',
  'Destierra los alimentos procesados (como las papitas de cualquier tipo o las galletas) de tu dieta. Tienen un alto porcentaje de azúcares y aceites hidrogenados (grasas) y carecen de fibra.',
  'Procura tomar alimentos ricos en proteínas con déficit de grasa, como la pechuga de pollo sin piel, o las claras de huevo. Ten en cuenta que las proteínas magras poseen un efecto térmico, es decir, que la cantidad de calorías que el cuerpo requiere para el proceso de ingestión, digestión y metabolización es mayor.',
  'No olvides beber agua en abundancia. A menudo se confunde el hambre con la deshidratación. Por otro lado, evita las bebidas azucaradas, pues contienen muchas calorías vacías. Dicho de otra forma, sin nutrientes ni vitaminas.',
  'Los principales consejos dietéticos para la prevención del cáncer son: reducir el consumo de grasas hasta en 30%, comer frutas y verduras para asegurarte del suministro indispensable de vitaminas A, C, E y beta-caroteno, aumentar la proporción de fibra de forma razonable, disminuir el consumo de salados, adobados y ahumados, y moderar la ingesta de alcohol.',
  'Las carnes rojas y los embutidos aportan proteínas y minerales de buena calidad, pero también un alto contenido en grasas y colesterol. Por ello, los nutricionistas limitan su consumo a un máximo de dos raciones semanales (por ración se entiende entre 100 y 200 gramos).',
  'Los lácteos aportan calcio, vitaminas A, D, B2, B9 y B12, también otros minerales como el fósforo. Pero al contener una elevada cantidad de grasa de origen animal pueden incrementar tus niveles de colesterol. Escoge las versiones desnatadas o semidesnatadas.',
  'Los hábitos alimenticios y los comportamientos sedentarios se desarrollan en la infancia y en la adolescencia. Después resultan muy difíciles de modificar. Por lo tanto, la influencia del ámbito familiar es decisiva. Cuida tu forma de comer y estarás protegiendo la de tus hijos.',
  'Si deseas darte algún capricho ocasional, come una porción pequeña para saciar las ganas. Si el antojo persiste, ingiere una pieza de fruta.',
  'La obsesión por la comida puede desembocar en graves trastornos de conducta, desencadenar una depresión o provocar carencias nutricionales. Acéptate tal y como eres y procura comer todo lo que tu organismo necesita sin otorgarle a los alimentos más importancia de la que representan.',
  'Recuerda que el exceso de peso perjudica el sueño y es frecuente que provoque insomnio, así como generar problemas sexuales.',
  'El sobrepeso y la obesidad incrementan de forma directa las probabilidades de sufrir hipertensión, diabetes y, en general, enfermedades cardiovasculares. La pérdida de 10% de tu peso puede disminuir de manera significativa el riesgo de padecer estas enfermedades.',
  'Dos copas de vino al día otorgan grandes beneficios a tu salud, pero tómalas siempre en la comida o durante la cena.',
  'Siempre que te sea posible, trata de pasear por 30 minutos después de las comidas.',
  'Y no olvides que, si quieres llegar a viejo, mucho trigo y poco puerco.',
];


const imagesData = [
  'https://i.imgur.com/3Eeb3cK.jpg',
  'https://i.imgur.com/EqH0IX3.jpg',
  'https://i.imgur.com/Ipvn4t4.jpg',
  'https://i.imgur.com/ZDv2sCR.jpg',
  'https://i.imgur.com/UFwsvwC.jpg',
  'https://i.imgur.com/c3UamxE.jpg',
  'https://i.imgur.com/1w8lkIu.jpg',
  'https://i.imgur.com/iUJTM1t.jpg',
  'https://i.imgur.com/5H40lQb.jpg',
  'https://i.imgur.com/eO6dj0b.jpg',
  'https://i.imgur.com/FtgPm7L.jpg',
  'https://i.imgur.com/7QR3PK7.jpg',
  'https://i.imgur.com/R9HJPpy.jpg',
  'https://i.imgur.com/qCSAoJT.jpg',
  'https://i.imgur.com/Nvd4exQ.jpg',
  'https://i.imgur.com/X8iV2j3.jpg',
  'https://i.imgur.com/GnoiO8C.jpg',
  'https://i.imgur.com/CEdwuHD.jpg',
  'https://i.imgur.com/IZ3TiQW.jpg',
  'https://i.imgur.com/E9CdyDm.jpg',
  'https://i.imgur.com/NTw8Tdu.jpg',
  'https://i.imgur.com/OfeYaae.jpg',
  'https://i.imgur.com/60Pz1En.jpg',
  'https://i.imgur.com/CfHrP3m.jpg',
  'https://i.imgur.com/QBlavs6.jpg',
  'https://i.imgur.com/8ACthVg.jpg',
  'https://i.imgur.com/9h6iaXd.jpg',
  'https://i.imgur.com/KSOocwD.jpg',
  'https://i.imgur.com/gPQpjE1.jpg',
  'https://i.imgur.com/Vb5ij4j.jpg',
  'https://i.imgur.com/714vPJP.jpg',
  'https://i.imgur.com/WgzzZcd.jpg',
  'https://i.imgur.com/VcwOtRq.jpg',
  'https://i.imgur.com/W6lJ4kb.jpg',
  'https://i.imgur.com/yIvx3hS.jpg',
  'https://i.imgur.com/mu4eKIB.jpg',
  'https://i.imgur.com/UFrwSg1.jpg',
  'https://i.imgur.com/vfyjIKD.jpg',
  'https://i.imgur.com/IUO55w9.jpg',
  'https://i.imgur.com/6l6qyTE.jpg',
  'https://i.imgur.com/fFuzTUB.jpg',
  'https://i.imgur.com/lFvvrBU.jpg',
  'https://i.imgur.com/CVd4XLt.jpg',
  'https://i.imgur.com/mf49V1q.jpg',
  'https://i.imgur.com/yaB6vQ3.jpg',
  'https://i.imgur.com/R1FH0uS.jpg',
  'https://i.imgur.com/Fq0OG0H.jpg',
  'https://i.imgur.com/cJDq4CD.jpg',
  'https://i.imgur.com/YWbveal.jpg',
  'https://i.imgur.com/vPdArlB.jpg',
];


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    WelcomeHandler,
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
