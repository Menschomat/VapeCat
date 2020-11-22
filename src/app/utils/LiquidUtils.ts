import { Aroma, AromaBottle, Bottle, NicotinBottle } from '../model/model';

export interface LiquidRecipe {
    base: number,
    shot: number,
    aroma: number,
    price?: number,
    aromabottles?: { id: number, amount: number }[]
}
export interface RecipeInput {
    amount: number,
    base: Bottle,
    aromaBottles?: AromaBottle[],
    aromaPercent?: number,
    nicotinYield?: number,
    shot?: NicotinBottle
}

export abstract class LiquidUtils {

    public static shotAmount(shot: NicotinBottle, bottleSize: number, liquidYield: number) {
        return (bottleSize * liquidYield) / shot.nicotinLevel;
    }

    public static bottlePrice(bottle: Bottle, amount: number) {
        return (bottle.price / bottle.size) * amount;
    }
    public static proportionOfBottle(bottle: Bottle, percent: number) {
        this.proportion(bottle.size, percent);
    }
    public static proportion(size: number, percent: number) {
        return size / 100 * percent;
    }
    public static generateReciepe(input: RecipeInput): LiquidRecipe {
        const output = { price: 0, base: 0, shot: 0 } as LiquidRecipe;
        const aroma: Aroma = input.aromaBottles ? input.aromaBottles[0]?.aroma : {} as Aroma;
        //Build Mix
        const aromaAmount = input.aromaPercent ? this.proportion(input.amount, input.aromaPercent) : this.proportion(input.amount, aroma.aromaPercent);
        if (input.aromaBottles) {
            //Sort AromaBottles by Level!
            input.aromaBottles.sort((a, b) => (a.level > b.level) ? 1 : -1);
            output.aromabottles = [];
            let totalAroma = aromaAmount;
            for (let bottle of input.aromaBottles) {
                if (bottle.level >= totalAroma) {
                    output.aromabottles.push({
                        id: bottle.id,
                        amount: totalAroma,
                    });
                    output.price += this.bottlePrice(bottle, totalAroma);
                    totalAroma = 0;
                    break;
                } else {
                    output.aromabottles.push({
                        id: bottle.id,
                        amount: bottle.level,
                    })
                    output.price += this.bottlePrice(bottle, bottle.level);
                    totalAroma -= bottle.level;
                }
            }
        }

        //Check if Nicotin is needed and add it to output!
        if (input.shot && input.nicotinYield && input.shot.nicotinLevel > 0 && input.nicotinYield > 0) {
            output.shot = this.shotAmount(input.shot, input.amount, input.nicotinYield);
            output.price += this.bottlePrice(input.shot, output.shot);
        }
        output.base = input.amount - output.shot - aromaAmount;
        output.price += this.bottlePrice(input.base, output.base);
        output.aroma = aromaAmount;
        return output;

    }

}