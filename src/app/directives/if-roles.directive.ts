import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../services/auth.service";

@Directive({
    selector: "[ifRoles]",
})
export class IfRolesDirective implements OnInit, OnDestroy {
    @Input() public ifRoles: Array<string>;

    private subscription: Subscription[] = [];

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private auth: AuthService
    ) {}

    public ngOnInit(): void {
        this.subscription.push(
            this.auth.getUserRoles().subscribe((res) => {
                if (!res || !res.roles) {
                    this.viewContainerRef.clear();
                } else {
                    const idx = res.roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
                    if (idx < 0) {
                        this.viewContainerRef.clear();
                    } else {
                        this.viewContainerRef.createEmbeddedView(this.templateRef);
                    }
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
