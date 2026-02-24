"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Info, Search, Sparkles } from "lucide-react";
import { MouseEvent, useDeferredValue, useMemo, useState } from "react";
import { UseChatStore, useChatStore } from "../store/useChatStore";
import { Model, Models } from "../types/model.types";

type Props = {
  models: Models | undefined;
  selectedModel: UseChatStore["selectedModel"];
};
export default function ModelSelector(props: Props) {
  const { models, selectedModel } = props;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedModel } = useChatStore();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery);
  const filteredModels = useMemo(() => {
    const query = deferredQuery.toLowerCase();
    return (
      models?.filter((model) => {
        return (
          model.name.toLowerCase().includes(query) ||
          model.description.toLowerCase().includes(query) ||
          model.id.toLowerCase().includes(query) ||
          model.architecture.modality.toLowerCase().includes(query)
        );
      }) || []
    );
  }, [deferredQuery, models]);

  if (!models) return "Models not found";

  const random =
    models.find((model) => model.id === selectedModel) || models[0];

  const formatContextLength = (length: number) => {
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
    return length;
  };
  const isFreeModel = (model: Model) => {
    return (
      model.pricing.prompt === "0" &&
      model.pricing.completion === "0" &&
      model.pricing.input_cache_read === "0"
    );
  };

  const openModelDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDetailsOpen(true);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-8 justify-between gap-2 px-2 text-xs hover:bg-accent",
            )}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate font-medium">
                {random.name || "Select model"}
              </span>
            </div>
            <ChevronDown className="size-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full mx-4 sm:w-2xl md:w-3xl p-2 sm:p-4 "
          align="center"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8"
            />
          </div>
          <Separator className="my-2 bg-border" />
          <ScrollArea className="h-100">
            <div className="">
              <div className="py-1.5 text-xs font-semibold text-muted-foreground">
                Available Models ({filteredModels.length})
              </div>
            </div>
            {filteredModels.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No models found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                {filteredModels.map((model) => (
                  <div
                    key={model.id}
                    className={cn(
                      "relative flex cursor-pointer select-none items-start gap-2 rounded-md py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground px-2 sm:px-4 ",
                      random.id === model.id && "bg-accent",
                    )}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm leading-none truncate flex gap-4">
                          {model.name}
                          <div className="inline">
                            <Check
                              className={cn(
                                "size-4",
                                random.id === model.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </div>
                        </div>
                        {isFreeModel(model) && (
                          <Badge
                            variant="secondary"
                            className="h-4 px-1 text-[10px]"
                          >
                            FREE
                          </Badge>
                        )}
                      </div>
                      <p className="hidden sm:block line-clamp-3 text-xs text-muted-foreground ">
                        {model.description}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span>
                          Context: {formatContextLength(model.context_length)}
                        </span>
                        <span>•</span>
                        <span className="capitalize">
                          {model.architecture.modality.replace("->", " → ")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0 shrink-0"
                      onClick={(e) => openModelDetails(e)}
                    >
                      <Info className="size-3.5" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {random?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information about this AI model
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className=" pr-4 h-100">
            {random && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {random.description}
                  </p>
                </div>

                <Separator />

                {/* Context & Capabilities */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Context & Capabilities
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Context Length
                      </p>
                      <p className="text-sm font-medium">
                        {formatContextLength(random.context_length)} tokens
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Max Completion Tokens
                      </p>
                      <p className="text-sm font-medium">
                        {formatContextLength(
                          random.top_provider.max_completion_tokens,
                        )}{" "}
                        tokens
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Modality</p>
                      <p className="text-sm font-medium capitalize">
                        {random.architecture.modality.replace("->", " → ")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Tokenizer</p>
                      <p className="text-sm font-medium">
                        {random.architecture.tokenizer}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Input/Output Modalities */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Supported Modalities
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Input Modalities
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {random.architecture.input_modalities.map(
                          (modality) => (
                            <Badge
                              key={modality}
                              variant="outline"
                              className="text-xs"
                            >
                              {modality}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Output Modalities
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {random.architecture.output_modalities.map(
                          (modality) => (
                            <Badge
                              key={modality}
                              variant="outline"
                              className="text-xs"
                            >
                              {modality}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Pricing</h3>
                  {isFreeModel(random) ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Badge variant="secondary" className="bg-green-500/20">
                        FREE
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        This model is completely free to use
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(random.pricing).map(([key, value]) => {
                        if (value === "0") return null;
                        return (
                          <div key={key} className="space-y-1">
                            <p className="text-xs text-muted-foreground capitalize">
                              {key.replace("_", " ")}
                            </p>
                            <p className="text-sm font-medium">${value}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Provider Info */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Provider Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Content Moderation
                      </span>
                      <Badge
                        variant={
                          random.top_provider.is_moderated
                            ? "default"
                            : "secondary"
                        }
                      >
                        {random.top_provider.is_moderated
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Model ID */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Model ID</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded block break-all">
                    {random.id}
                  </code>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
