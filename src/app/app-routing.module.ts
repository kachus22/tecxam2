import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginPageComponent } from 'src/app/components/_login-page/login-page.component';
import { MainPageComponent } from './components/_main-page/main-page.component';
import { ExamsPageComponent } from './components/_exams-page/exams-page.component';
import { EditExamComponent } from './components/_edit-exam/edit-exam.component';
import { NotFoundPageComponent } from './components/_not-found-page/not-found-page.component';

const routes: Routes = [
  {
     path: '',
     component: MainPageComponent,
     canActivate: [AuthGuard]
  },
  {
     path: 'login',
     component: LoginPageComponent
  },
  {
     path: 'courses/:id/exams/:eid/questions',
     component: EditExamComponent,
     canActivate: [AuthGuard]
  },
  {
     path: 'courses/:id/exams',
     component: ExamsPageComponent,
     canActivate: [AuthGuard]
  },
  {
     path: '**',
     component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
