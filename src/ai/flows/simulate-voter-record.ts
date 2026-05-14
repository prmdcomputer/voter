'use server';
/**
 * @fileOverview A Genkit flow for simulating an ECI (Election Commission of India) voter record based on an EPIC number.
 *
 * - simulateVoterRecord - A function that generates realistic voter data.
 * - SimulateVoterRecordInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulateVoterRecordInputSchema = z.object({
  epicNo: z.string().describe("The EPIC number of the voter."),
  targetLanguage: z.string().describe("The local language for regional fields (e.g., Hindi, Marathi)."),
});
export type SimulateVoterRecordInput = z.infer<typeof SimulateVoterRecordInputSchema>;

const SimulateVoterRecordOutputSchema = z.object({
  content: z.object({
    epicNumber: z.string(),
    applicantFirstName: z.string(),
    applicantFirstNameL1: z.string(),
    applicantLastName: z.string(),
    applicantLastNameL1: z.string(),
    fullNameL1: z.string(),
    gender: z.enum(['M', 'F', 'O']),
    age: z.number(),
    districtValue: z.string(),
    districtValueL1: z.string(),
    stateName: z.string(),
    stateNameL1: z.string(),
    partNumber: z.string(),
    partName: z.string(),
    partNameL1: z.string(),
    psbuildingName: z.string(),
    relationName: z.string(),
    relationNameL1: z.string(),
    relationLName: z.string(),
    relationLNameL1: z.string(),
    relativeFullNameL1: z.string(),
    relationType: z.enum(['FTHR', 'HUSB', 'MTHR', 'OTHR']),
    acNumber: z.string(),
    asmblyName: z.string(),
    asmblyNameL1: z.string(),
  })
});
export type SimulateVoterRecordOutput = z.infer<typeof SimulateVoterRecordOutputSchema>;

const simulatePrompt = ai.definePrompt({
  name: 'simulateVoterRecordPrompt',
  input: { schema: SimulateVoterRecordInputSchema },
  output: { schema: SimulateVoterRecordOutputSchema },
  prompt: `You are simulating the Election Commission of India's voter search API.
Generate a realistic voter record for EPIC number: {{{epicNo}}}.
The regional fields (ending in L1) must be in {{targetLanguage}}.
Generate plausible Indian names and addresses.

Fields to generate:
- applicantFirstName (English)
- applicantFirstNameL1 ({{targetLanguage}})
- applicantLastName (English)
- applicantLastNameL1 ({{targetLanguage}})
- fullNameL1 (Full name in {{targetLanguage}})
- gender (M or F)
- age (between 18-90)
- districtValue (A real district name in English)
- districtValueL1 (District name in {{targetLanguage}})
- stateName (A real Indian state)
- stateNameL1 (State name in {{targetLanguage}})
- partNumber (e.g., "123")
- partName (A school name or building in English)
- partNameL1 (The same in {{targetLanguage}})
- relationType (FTHR or HUSB)
- relationName (Relative's first name in English)
- relationNameL1 (Relative's first name in {{targetLanguage}})
- relationLName (Relative's last name in English)
- relationLNameL1 (Relative's last name in {{targetLanguage}})
- relativeFullNameL1 (Relative's full name in {{targetLanguage}})
- acNumber (Assembly Constituency number)
- asmblyName (Constituency name in English)
- asmblyNameL1 (Constituency name in {{targetLanguage}})`,
});

const simulateVoterRecordFlow = ai.defineFlow(
  {
    name: 'simulateVoterRecordFlow',
    inputSchema: SimulateVoterRecordInputSchema,
    outputSchema: SimulateVoterRecordOutputSchema,
  },
  async (input) => {
    const { output } = await simulatePrompt(input);
    if (!output) throw new Error('Failed to simulate voter record');
    return output;
  }
);

export async function simulateVoterRecord(input: SimulateVoterRecordInput): Promise<SimulateVoterRecordOutput> {
  return simulateVoterRecordFlow(input);
}