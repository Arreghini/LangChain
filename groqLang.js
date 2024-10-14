import dotenv from 'dotenv';
dotenv.config();
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers'

// Primero inicializamos el modelo
const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'mixtral-8x7b-32768', 
})

// Ahora usaremos una plantilla de prompts (con ella logramos una entrada mas apropiada al modelo)
const prompt= ChatPromptTemplate.fromMessages([
    ['system', 'Sos un asistente servicial.'],
    ['human', '{input}'],
])

//Le agregamos un analizador de salida simple (Output Parser)
const outputParser = new StringOutputParser();

//Ahora combinamos el template con el modelo de cadena simple de langChain
// Vemos que a continuación, con una concatenación simple de pasos podemos combinar la entrada con la salida.  
//Este es el poder de las “chains” en Langchain, de forma muy simple, podemos concatenar una secuencia de pasos que vayan 
//transformando tanto las entradas como las salidas de una LLM.
const chain = prompt.pipe(model).pipe(outputParser);

//Invocamos la cadena
const response= await chain.invoke({
//input: 'Hola, cuéntame sobre LangChain y Groq AI',
//input: 'Hola, cuénteame sobre en qué consiste la mecánica cuántica'
//input: 'Hola, dame el codigo para activar 3 led mediante 3 tópicos diferentes'
input: 'Hola, dame el codigo para activar 3 led mediante 3 tópicos diferentes para un esp32'
})

console.log(response)