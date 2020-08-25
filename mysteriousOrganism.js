// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(key, baseArray)
{
  return {
    specimenNum: key,
    dna: baseArray,
    mutate() {
      let idxOfBaseToMutate = Math.floor(Math.random() * 15);
      let baseToMutate = this.dna[idxOfBaseToMutate];
      // console.log('Index of base: ' + idxOfBaseToMutate + ', BaseToMutate: ' + baseToMutate);
      let possMutationsForA = ['T', 'C', 'G']
      let possMutationsForT = ['A', 'C', 'G']
      let possMutationsForC = ['T', 'A', 'G']
      let possMutationsForG = ['T', 'C', 'A']
      let idx = Math.floor(Math.random() * 3);
      let newBase;
      if (baseToMutate === 'A')
      {
        newBase = possMutationsForA[idx];
      }
      else if (baseToMutate === 'T')
      {
        newBase = possMutationsForT[idx];
      }
      else if (baseToMutate === 'C')
      {
        newBase = possMutationsForC[idx];
      }
      else if (baseToMutate === 'G')
      {
        newBase = possMutationsForG[idx];
      }
      // console.log('NewBase: ' + newBase);
      this.dna[idxOfBaseToMutate] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      let noIdenticalBases = 0;
      for (let i=0; i < this.dna.length; i++)
      {
        if (this.dna[i] === pAequor.dna[i])
        {
          noIdenticalBases++;
        }
      }
      let percentage = (noIdenticalBases/this.dna.length)*100;
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive() {
      let cOrGBases = 0; 
      for (let i=0; i < this.dna.length; i++)
      {
        if (this.dna[i] === 'C'
          || this.dna[i] === 'G')
        {
          cOrGBases++;
        }
      }
      if (cOrGBases/this.dna.length >= 0.6)
      {
        return true;
      }
      return false;
    },
    complementStrand()
    {
      let newStrand = [];
      for (let i=0; i< this.dna.length; i++)
      {
        let base = this.dna[i];
        let possBases = ['A', 'T', 'C', 'G'];
        let compBases = ['T', 'A', 'G', 'C'];
        let idx = possBases.indexOf(base);
        newStrand[i] = compBases[idx];
      }
      return newStrand;
    }
  };
}


let survivingPAequor = [];
while (survivingPAequor.length < 30)
{
  let spec = pAequorFactory(survivingPAequor.length + 1, mockUpStrand());
  if (spec.willLikelySurvive())
  {
    survivingPAequor.push(spec);
  }
}

let specA = survivingPAequor[0];
// let specB = survivingPAequor[1];

console.log(specA.dna);
// console.log(specB.dna);
// specA.compareDNA(specB);

// console.log(specA.mutate());
console.log(specA.complementStrand());
