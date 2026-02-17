"use client";

import { CardSpotlight } from "./ui/card-spotlight";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Footer } from "./Footer";
import { fetchArticles, type Article } from "../data/articles";

export function ArticlePage({
  onNavigate,
}: {
  onNavigate?: (page: string) => void;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");
  const [allCategories, setAllCategories] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);

      try {
        const data = await fetchArticles(); // 远端优先；失败会自动 fallback 本地并 log
        if (cancelled) return;

        setArticles(data);

        // Extract unique categories
        const categoriesSet = new Set<string>();
        data.forEach((article) => {
          article.categories?.forEach((cat) =>
            categoriesSet.add(cat),
          );
        });

        setAllCategories([
          "All",
          ...Array.from(categoriesSet).sort((a, b) =>
            a.localeCompare(b),
          ),
        ]);
      } catch (e) {
        // 理论上 fetchArticles 已经兜底了，但这里再加一层保险
        if (cancelled) return;
        setLoadError(
          e instanceof Error
            ? e.message
            : "Failed to load articles",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articles;

    const selected = selectedCategory.toLowerCase();
    return articles.filter((article) =>
      article.categories?.some(
        (cat) => cat.toLowerCase() === selected,
      ),
    );
  }, [articles, selectedCategory]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="w-full bg-muted/30 px-4 pt-24 pb-8 sm:px-6 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-4">
          <h1>Articles</h1>
          <p className="description-large">
            Insights, thoughts, and learnings from my journey in
            design and technology
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="w-full border-b bg-white px-4 py-6 sm:px-6 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex flex-wrap items-center gap-3">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-accent hover:bg-accent-hover"
                      : ""
                  }
                  disabled={loading}
                >
                  {category.charAt(0).toUpperCase() +
                    category.slice(1)}
                </Button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Showing {filteredArticles.length}{" "}
                  {filteredArticles.length === 1
                    ? "article"
                    : "articles"}
                </>
              )}
            </span>
          </div>

          {/* 可选：如果你想提示“已 fallback 到本地”，可以在 fetchArticles 里暴露状态；
              目前 fetchArticles 自己会 console.warn，所以这里先只展示真正错误 */}
          {loadError && (
            <div className="mt-3 text-sm text-red-600">
              Failed to load articles: {loadError}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {!loading && filteredArticles.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-xl text-muted-foreground">
                No articles found in this category
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-xl text-muted-foreground">
                Loading articles...
              </div>
            </div>
          )}

          {!loading && filteredArticles.length > 0 && (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <CardSpotlight
                  key={article.link} // ✅ 原来 article.id 不存在，这里用 link 作为稳定 key
                  className="group cursor-pointer bg-white transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative z-20 p-6">
                    <div className="mb-4 aspect-video w-full overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mb-3 flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {article.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    <h5 className="mb-2">{article.title}</h5>
                    <p className="mb-4 text-gray-600">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {article.categories.map(
                        (category, categoryIndex) => (
                          <Badge
                            key={`${category}-${categoryIndex}`}
                            variant="secondary"
                            className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {category}
                          </Badge>
                        ),
                      )}
                    </div>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/main mt-4 inline-flex items-center gap-1 text-sm font-medium link-accent"
                    >
                      Read on Medium
                      <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover/main:opacity-100" />
                    </a>

                    {/* Related Articles Section */}
                    {article.childArticles &&
                      article.childArticles.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                          <p className="mb-3 text-sm font-medium text-gray-900">
                            Related Articles:
                          </p>
                          <ul className="space-y-2.5">
                            {article.childArticles.map(
                              (childArticle, childIndex) => (
                                <li
                                  key={`${childArticle.title}-${childIndex}`}
                                  className="flex items-center gap-2"
                                >
                                  <span className="bullet-accent">
                                    •
                                  </span>
                                  <div className="flex-1">
                                    {childArticle.link &&
                                    childArticle.link !== "" &&
                                    childArticle.link !==
                                      "..." ? (
                                      <a
                                        href={childArticle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/child inline-flex items-center gap-1 text-sm font-medium link-accent"
                                        onClick={(e) =>
                                          e.stopPropagation()
                                        }
                                      >
                                        {childArticle.title}
                                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/child:opacity-100" />
                                      </a>
                                    ) : (
                                      <span className="text-sm font-medium text-gray-700">
                                        {childArticle.title}
                                      </span>
                                    )}

                                    {childArticle.readTime && (
                                      <p className="mt-0.5 caption">
                                        {childArticle.readTime}
                                      </p>
                                    )}

                                    {(!childArticle.link ||
                                      childArticle.link ===
                                        "" ||
                                      childArticle.link ===
                                        "...") &&
                                      !childArticle.readTime && (
                                        <p className="mt-0.5 caption">
                                          Let's talk if
                                          interested!
                                        </p>
                                      )}
                                  </div>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </CardSpotlight>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}