import herolist from './herolist.json';

export default {
  '/api/web201605/js/herolist.json': herolist,

  'POST /api/herodetails.json': (req: any, res: any) => {
    const { ename } = req.body;
    const hero = herolist.filter(
      (item) => item.ename === parseInt(ename, 10),
    )[0];
    res.send(hero);
  },

  'POST /apimock/freeheros.json': (req: any, res: any) => {
    const { number } = req.body;
    function getRandomArrayElements(arr: any, count: number) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
