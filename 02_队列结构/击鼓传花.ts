import Queue from "./实现Queue";

function hotPotato(names: string[], num: number) {
  const queue = new Queue<string>();
  for (const name of names) {
    queue.enqueue(name);
  }

  while (queue.size > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }

  const leftName = queue.dequeue()!;
  console.log("最后剩下的人:", leftName);

  return names.indexOf(leftName);
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
console.log(hotPotato(names, 7));

export {};
