--  RUN 1st
create extension vector;

-- RUN 2nd
create table SadG (
  id bigserial primary key,
  essay_title text,
  essay_url text,
  essay_date text,
  essay_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function SadG_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  essay_title text,
  essay_url text,
  essay_date text,
  essay_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plSadGsql
as $$
begin
  return query
  select
    SadG.id,
    SadG.essay_title,
    SadG.essay_url,
    SadG.essay_date,
    SadG.essay_thanks,
    SadG.content,
    SadG.content_length,
    SadG.content_tokens,
    1 - (SadG.embedding <=> query_embedding) as similarity
  from SadG
  where 1 - (SadG.embedding <=> query_embedding) > similarity_threshold
  order by SadG.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on SadG 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);