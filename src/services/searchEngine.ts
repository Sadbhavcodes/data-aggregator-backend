import { EntertainmentModel, TravelModel } from "../models";
import { Request, Response } from "express";

import { Model } from "mongoose";

const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, 
                    matrix[i][j - 1] + 1,     
                    matrix[i - 1][j] + 1      
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

export const searchEngine = async (
    model: Model<any>,
    hardFilters: object,
    fuzzyRules: { field: string; value: string; limit: number }[]
) => {
    try {
    
        let results = await model.find(hardFilters);

        if (results.length === 0) return [];

        for (const rule of fuzzyRules) {
            
            const userInput = rule.value.toString().trim().toLowerCase();
            if (!userInput) continue; 

            results = results.filter((item: any) => {
                const dbValue = item[rule.field].toString().trim().toLowerCase();
                const distance = getLevenshteinDistance(dbValue, userInput);
                return distance <= rule.limit;
            });

            if (results.length === 0) break;
        }
        return results;

    } catch (error) {
        console.error("Search Engine Error:", error);
        return [];
    }
};