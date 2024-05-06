import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../shared/services/rating.service';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Rate } from '../../shared/models/Rate';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  activeStars = 0;

  userId?: string;
  username?: string;
  authSubscription: Subscription | undefined;
  ownRates: Rate[] = [];

  constructor(private rateService: RatingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getUserId().subscribe(userId => {
      this.userId = userId!;
      if (this.userId) {
        this.rateService.getOwn(this.userId).subscribe(rates => {
          console.log('Own rates:', rates);
          this.ownRates = rates;
        });
      }
    });

    this.authSubscription = this.authService.getUsername().subscribe(username => {
      this.username = username!;
    });
  }

  rate(starCount: number) {
    this.activeStars = starCount;
    //console.log(this.activeStars);

    const rate: Rate = {
      id: '',
      user_id: this.userId || '',
      rate: starCount
    };

    this.rateService.create(rate).then(() => {
      console.log('Rate added successfully');
    }).catch(error => {
      //console.error('Error adding rate:', error);
    });

  }

  isStarActive(index: number): boolean {
    return index <= this.activeStars;
  }
}
