export type Models = Model[];
export type Model = {
  id: string;
  name: string;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: TopProvider;
};
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
