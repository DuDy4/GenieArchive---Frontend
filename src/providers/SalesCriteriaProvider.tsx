import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

interface SalesCriteria {
  criteria: string;
  target_score: number;
  score: number;
}

interface SalesCriteriaResponse {
  sales_criteria?: SalesCriteria[];
}

interface SalesCriteriaContextType {
  salesCriteria: SalesCriteria[] | null;
  error: Error | null;
  isLoading: boolean;
}

const SalesCriteriaContext = createContext<SalesCriteriaContextType | undefined>(
  undefined
);

export const SalesCriteriaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  tenant_id,
  uuid,
}) => {
  const { makeRequest } = useApiClient();
  const [salesCriteria, setSalesCriteria] = useState<SalesCriteria[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingSalesCriteria, setIsLoadingSalesCriteria] = useState<boolean>(false);
  const [clickedScores, setClickedScores] = useState<{ [key: string]: number }>({});
  const [hoveredScores, setHoveredScores] = useState<{ [key: string]: number }>({});

    const handleHoverScores = (criteria: str, score: int) => {
      setHoveredScores({ ...hoveredScores, [criteria]: score });
    }
    const handleUnhoverScores = (criteria: str, score: int) => {
      setHoveredScores({ ...hoveredScores, [criteria]: 0 });
    }

    const handleClickedScores = (criteria: str, score: int) => {
      setClickedScores({ ...clickedScores, [criteria]: score });
    }

    const handleUnclickedScores = (criteria: str) => {
      const { [criteria]: _, ...rest } = clickedScores;
      setClickedScores(rest);
    }

  const fetchSalesCriteria =
      async () => {
        setIsLoadingSalesCriteria(true);
        setError(null);

        try {
          const response = await makeRequest<SalesCriteriaResponse>(
            "GET",
            `/${tenant_id}/profiles/${uuid}/sales-criteria`
          );

          setSalesCriteria(response.sales_criteria || null);
        } catch (err) {
          console.error("Failed to fetch sales criteria:", err);
          setError(err as Error);
        } finally {
          setIsLoadingSalesCriteria(false);
        }
      };

    useEffect(() => {
      fetchSalesCriteria();
    }, []);

  return (
    <SalesCriteriaContext.Provider
      value={{ salesCriteria, error, isLoadingSalesCriteria, hoveredScores, handleHoverScores, handleUnhoverScores, clickedScores, handleClickedScores, handleUnclickedScores }}
    >
      {children}
    </SalesCriteriaContext.Provider>
  );
};

export const useSalesCriteria = () => {
  const context = useContext(SalesCriteriaContext);
  if (context === undefined) {
    throw new Error("useSalesCriteria must be used within a SalesCriteriaProvider");
  }
  return context;
};
