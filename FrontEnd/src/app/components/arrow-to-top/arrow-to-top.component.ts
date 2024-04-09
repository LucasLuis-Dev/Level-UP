import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow-to-top.component.html',
  styleUrl: './arrow-to-top.component.scss'
})
export class ArrowToTopComponent implements OnInit {
  displayArrow: boolean = false;

  ngOnInit(): void {
    this.displayArrowOnPage()
  }

  @HostListener('window:scroll', [])
  displayArrowOnPage() {
    let height = window.scrollY
    

    if (height >= 500) {
      this.displayArrow = true
    } else if (height < 500) {
      this.displayArrow = false
    }
  }

  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



}
