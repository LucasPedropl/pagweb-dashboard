import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateReportAnalysis = async (
	reportType: string,
	contextData: string
): Promise<string> => {
	try {
		if (!ai) {
			console.error(
				'Gemini API Key is missing. Set VITE_GEMINI_API_KEY in your environment.'
			);
			return 'Configuração da IA ausente. Defina a variável de ambiente e publique novamente.';
		}

		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: `You are a senior financial analyst for a SaaS company. Analyze the following data context for a "${reportType}" report: ${contextData}`,
			config: {
				systemInstruction:
					'Format the output in concise Markdown using bolding for key metrics. Provide 3 bullet points of insights and 1 actionable recommendation.',
				temperature: 0.3,
			},
		});

		return response.text || 'Não foi possível gerar a análise no momento.';
	} catch (error) {
		console.error('Gemini API Error:', error);
		return 'Falha ao conectar com a IA. Tente novamente mais tarde.';
	}
};
