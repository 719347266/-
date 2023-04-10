class Graph<T> {
  // 顶点
  private verteces: T[] = [];
  // 边: 邻接表
  private adjList: Map<T, T[]> = new Map();

  /** 添加顶点和边的方法 */
  addVertex(vertex: T) {
    // 将顶点添加到顶点数组中
    this.verteces.push(vertex);
    // 创建一个邻接表中的数组
    this.adjList.set(vertex, []);
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }

  // 遍历
  traverse() {
    console.log("Graph:");
    if (!this.verteces.length) return;
    this.verteces.forEach((vertex) => {
      const edges = this.adjList.get(vertex);
      console.log(`${vertex} -> ${edges?.join(" ")}`);
    });
  }

  bfs() {
    if (!this.verteces.length) return;
    // 创建一个队列访问所有顶点
    const queue = [this.verteces[0]];

    // 3.创建Set结构, 记录某一个顶点是否被访问过
    const visited = new Set<T>();
    visited.add(this.verteces[0]);
    while (queue.length) {
      const vertex = queue.shift()!;
      console.log(vertex);
      // 相邻的顶点
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

graph.traverse();
graph.bfs();

export {};
