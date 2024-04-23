import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      mobile: [''],
      upiId: [],
      password: ['', Validators.required]
      // Add other form controls as needed
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      // Implement logic to save/update user profile using API call or local storage
      console.log('Saving profile:', this.profileForm.value);
    }
}}
