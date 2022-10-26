import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'; //Trabalhando com reactives forms

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from './../../../services/messages.service';
import { CommentsService } from 'src/app/services/comments.service';

import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'



@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes
  faEdit = faEdit

  commentForm!: FormGroup


  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data))

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')!
  }
  get username() {
    return this.commentForm.get('username')!
  }


  async removeHandler(id: Number){
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add('Momento excluído com sucesso!')

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective){
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentsService.CreateComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messageService.add('Comentário adicionado com sucesso!')

    //reseta o form
    this.commentForm.reset()

    formDirective.resetForm()
  }
}
