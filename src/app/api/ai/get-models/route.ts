import { NextRequest, NextResponse } from "next/server";

export interface Root {
  id: string;
  name: string;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: TopProvider;
  canonical_slug: string;
  hugging_face_id: string;
  created: number;
  per_request_limits: null;
  supported_parameters: string[];
  default_parameters: DefaultParameters;
  expiration_date: null;
}

export interface Architecture {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: null;
}

export interface Pricing {
  prompt: string;
  completion: string;
  input_cache_read: string;
}

export interface TopProvider {
  context_length: number;
  max_completion_tokens: number;
  is_moderated: boolean;
}

export interface DefaultParameters {
  temperature: number;
  top_p: number;
  frequency_penalty: null;
}

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: { data: Root[] } = await response.json();
    const freedModels = data.data
      .filter((model) => {
        const promptPrice = model.pricing.prompt || "0";
        const completionPrice = model.pricing.completion || "0";

        return promptPrice === "0" && completionPrice === "0";
      })
      .slice(0, 20);

    const formattedModels = freedModels.map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      context_length: model.context_length,
      architecture: model.architecture,
      pricing: model.pricing,
      top_provider: model.top_provider,
    }));
    return NextResponse.json(formattedModels);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to fetch free models",
      },
      {
        status: 500,
      },
    );
  }
}
