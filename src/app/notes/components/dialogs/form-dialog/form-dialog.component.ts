import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { NotesService } from '../../../services/notes.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Note, CreateNote } from '../../../models/note';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {

  action: string;
  dialogTitle: string;
  stdForm: FormGroup;
  note: CreateNote;
  note_id: number = null;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notesService: NotesService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = data.note.title;
      this.note = data.note;
    } else {
      this.dialogTitle = 'New Note';
      this.note = new CreateNote({});
    }

    this.stdForm = this.createNoteForm();
    }
    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required')
        ? 'Required field'
        : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
    }

    createNoteForm(): FormGroup {
      return this.fb.group({
        title: [this.note.title],
        content: [this.note.content],
      });
    }

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public submit() {
      // emppty stuff
    }

    public onSubmit(): void {
      if (this.action === 'edit') {
        this.notesService.editNote(this.stdForm.getRawValue(), this.note_id)
      } else {
        this.dialogTitle = 'New Note';
        this.notesService.addNote(this.stdForm.getRawValue())
      }
    }

}
