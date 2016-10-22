import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'footer-section',
  template: `
  	<footer class="footer">
  	  <a class="github" href="https://github.com/projectSHAI/expressgular2/blob/master/README.md">
        <img class="octocat" src="../../../assets/octocat.png"/>
        <p>Github</p>
      </a>
      <a class="devs" href="#">
        <p>Meet the Devs</p>
      </a>
  	</footer>`,
  styles: [`
    footer{
  	    position: fixed;
  	    bottom: 0;
  	    right:0;
  	    left:0;
        height: 25px;
  	    background-image: url(../../../assets/footer.jpg);
  	}
    p{
      color: white;
      text-decoration: none;
      display: inline-block;
      line-height: 25px;
    }
    .octocat{
      display: inline-block;
      float: left;
      height: 25px;
      width: auto;
    }
    .github p{
      margin-left: 3px;
    }
    .github:hover p,
    .devs:hover p{
      text-decoration: underline;
    }
    .devs{
      float: right;
      margin-right: 5px;
    }`]
})

export class FooterComponent { }
