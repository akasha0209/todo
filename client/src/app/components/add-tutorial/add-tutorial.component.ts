import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;

  constructor(private TutorialService: TutorialService) {}

  ngOnInit(): void {}

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };

    // this.TutorialService.create(data).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.submitted = true;
    //   },
    //   error: (e) => console.error(e),
    // });

    this.TutorialService.create(data).subscribe(
      (res) => {
        console.log('res::', res);
        this.submitted = true;
      },
      (err) => {
        console.log('error::', err);
      }
    );
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }
}
