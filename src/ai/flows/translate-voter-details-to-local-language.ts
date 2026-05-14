'use server';
/**
 * @fileOverview A Genkit flow for translating voter details (name, father/husband name, address) from English into a specified local language.
 *
 * - translateVoterDetailsToLocalLanguage - A function that handles the translation process.
 * - TranslateVoterDetailsToLocalLanguageInput - The input type for the translateVoterDetailsToLocalLanguage function.
 * - TranslateVoterDetailsToLocalLanguageOutput - The return type for the translateVoterDetailsToLocalLanguage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the translation flow
const TranslateVoterDetailsToLocalLanguageInputSchema = z.object({
  name: z.string().describe("The voter's name in English."),
  fatherHusbandName: z.string().describe("The voter's father's or husband's name in English."),
  address: z.string().describe("The voter's address in English."),
  targetLanguage: z.string().describe("The local language to translate into (e.g., 'Hindi', 'Punjabi', 'Gujarati', 'Marathi', 'Tamil', 'Kannada', 'Bengali', 'Telugu', 'Sindhi', 'Oriya')."),
});
export type TranslateVoterDetailsToLocalLanguageInput = z.infer<typeof TranslateVoterDetailsToLocalLanguageInputSchema>;

// Define the output schema for the translation flow
const TranslateVoterDetailsToLocalLanguageOutputSchema = z.object({
  nameLocal: z.string().describe("The voter's name translated into the specified local language."),
  fatherHusbandNameLocal: z.string().describe("The voter's father's or husband's name translated into the specified local language."),
  addressLocal: z.string().describe("The voter's address translated into the specified local language."),
});
export type TranslateVoterDetailsToLocalLanguageOutput = z.infer<typeof TranslateVoterDetailsToLocalLanguageOutputSchema>;

// Define the prompt for translation
const translatePrompt = ai.definePrompt({
  name: 'translateVoterDetailsPrompt',
  input: { schema: TranslateVoterDetailsToLocalLanguageInputSchema },
  output: { schema: TranslateVoterDetailsToLocalLanguageOutputSchema },
  prompt: `You are a highly accurate translation assistant. Your task is to translate the provided English voter details into the specified local language.
Ensure that the translation is culturally appropriate and precise. Return only the translated fields in JSON format, exactly matching the output schema.

English Voter Details:
Name: {{{name}}}
Father/Husband Name: {{{fatherHusbandName}}}
Address: {{{address}}}

Translate these details into {{targetLanguage}}.`,
});

// Define the Genkit flow
const translateVoterDetailsToLocalLanguageFlow = ai.defineFlow(
  {
    name: 'translateVoterDetailsToLocalLanguageFlow',
    inputSchema: TranslateVoterDetailsToLocalLanguageInputSchema,
    outputSchema: TranslateVoterDetailsToLocalLanguageOutputSchema,
  },
  async (input) => {
    const { output } = await translatePrompt(input);
    if (!output) {
      throw new Error('Failed to get translation output from the model.');
    }
    return output;
  }
);

// Export a wrapper function to be called from the Next.js client
export async function translateVoterDetailsToLocalLanguage(
  input: TranslateVoterDetailsToLocalLanguageInput
): Promise<TranslateVoterDetailsToLocalLanguageOutput> {
  return translateVoterDetailsToLocalLanguageFlow(input);
}
