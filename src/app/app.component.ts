import { VERSION } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgStyle, NgIf], // NgIf
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  show = false
  clicked = 0
  title = `clicked ${this.clicked} times`;

  scroll_stuff = 0.0;
  top_bar_color: string = 'rgb(45, 49, 66)'
  border_color: string = '2px solid rgba(255, 255, 255, 0.8);'

  viewWidth = window.innerWidth;

  ngOnInit(): void {
    window.addEventListener('resize', this.updateWidth);
  }
  updateWidth = () => {
    this.viewWidth = window.innerWidth;
  };
  ngOnDestroy() {
    window.removeEventListener('resize', this.updateWidth);
  }

  handleClick(){
    this.clicked += 1;
    this.title = `clicked ${this.clicked} times`;
    console.log(this.clicked)
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let startColor = [45, 49, 66]; // Blue
    let endColor = [255,255,255]; // Red
    
    let scrollPercentage = window.scrollY / 800;

    let r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollPercentage);
    let g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollPercentage);
    let b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollPercentage);

    this.top_bar_color = `rgb(${r},${g},${b})`;
    this.border_color = `2px solid rgb(${r},${g},${b})`
  }
}
