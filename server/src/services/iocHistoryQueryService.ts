import pool from "../db";

export interface HistoryQueryParams {
  ownerType: string;
  ownerId: string;
  limit: number;
  offset: number;
}

export async function queryHistory({
  ownerType,
  ownerId,
  limit,
  offset,
}: HistoryQueryParams) {
  const { rows } = await pool.query(
    `
    SELECT
      ioc_value,

      -- canonical verdict (latest)
      (
        ARRAY_AGG(
          CASE
            WHEN LOWER(verdict) IN ('clean', 'benign') THEN 'Clean'
            WHEN LOWER(verdict) = 'suspicious' THEN 'Suspicious'
            WHEN LOWER(verdict) = 'malicious' THEN 'Malicious'
            ELSE ''
          END
          ORDER BY created_at DESC
        )
      )[1] AS verdict,

      -- latest timestamp
      MAX(created_at) AS created_at,

      -- average score
      ROUND(
        AVG(
          CASE
            WHEN LOWER(verdict) IN ('clean', 'benign') THEN 100
            WHEN LOWER(verdict) = 'suspicious' THEN 50
            WHEN LOWER(verdict) = 'malicious' THEN 0
            ELSE NULL
          END
        )
      )::INT AS score

    FROM ioc_history
    WHERE owner_type = $1
      AND owner_id = $2
    GROUP BY ioc_value
    ORDER BY created_at DESC
    LIMIT $3 OFFSET $4
    `,
    [ownerType, ownerId, limit, offset]
  );

  return rows;
}

