import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PasswordResetRequestComponent } from "./password-reset-request.component";

describe("PasswordResetComponent", () => {
    let component: PasswordResetRequestComponent;
    let fixture: ComponentFixture<PasswordResetRequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordResetRequestComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordResetRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
