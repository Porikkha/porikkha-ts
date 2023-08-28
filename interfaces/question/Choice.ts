import Random from '@/utils/random';

export default interface Choice {
  text: string;
  id: number;
}

export function permuteChoices(choices: Choice[], rand: Random) {
   let newChoices = choices; 
   newChoices.map((choice, index) => {
    let i = rand.randrange(index,choices.length-1);
    [newChoices[i],newChoices[index]] = [newChoices[index],newChoices[i]] ; 
  });
  return newChoices; 
}