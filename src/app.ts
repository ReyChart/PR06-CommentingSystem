import { Main } from './components/main';

class App {
  root = document.getElementById('app') as HTMLElement;
  main = new Main(this.root);

  constructor() {
    this.render();
  }

  private render() {
    this.main.render();
  }
}

new App();
