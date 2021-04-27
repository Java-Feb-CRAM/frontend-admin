import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import {
  MatToolbar,
  MatToolbarModule,
  MatToolbarRow,
} from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule, MatNavList } from '@angular/material/list';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { B } from '@angular/cdk/keycodes';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MatMenu,
        MatToolbar,
        MatToolbarRow,
        MatNavList,
        MatIcon,
        MatMenu,
        MatButton,
      ],
      providers: [UserService],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  it('should display links', () => {
    component.navigation = [
      { link: 'abc', label: 'ABC' },
      { link: 'def', label: 'DEF' },
    ];
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('#links > a'));
    expect(de[0].nativeElement.innerText).toContain('ABC');
    expect(de[1].nativeElement.innerText).toContain('DEF');
    expect(de[0].properties['href']).toContain('abc');
    expect(de[1].properties['href']).toContain('def');
  });

  it('should display person icon if logged in', () => {
    userService.isLoggedIn = true;
    userService.user = {
      givenName: 'Joe',
    };
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.default-menu-icon'));
    const el: HTMLElement = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should not display person icon if logged out', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.default-menu-icon'));
    expect(de).toBeFalsy();
  });

  it('should display Login if logged out', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#login'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Login');
  });

  it('should display name if logged in', () => {
    userService.isLoggedIn = true;
    userService.user = {
      givenName: 'Joe',
    };
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#name'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Joe');
  });

  it('should display link to login if logged out', async () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    const menu = await loader.getHarness<MatMenuHarness>(
      MatMenuHarness.with({
        selector: `#open-menu`,
      })
    );
    await menu.open();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#login-link'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Login');
  });

  it('should display log out button if logged in', async () => {
    userService.isLoggedIn = true;
    userService.user = {
      givenName: 'Joe',
    };
    fixture.detectChanges();
    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    const menu = await loader.getHarness<MatMenuHarness>(
      MatMenuHarness.with({
        selector: `#open-menu`,
      })
    );
    await menu.open();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#logout'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain('Logout');
  });

  it('should logout the user when clicking on the logout button', async () => {
    userService.isLoggedIn = true;
    userService.user = {
      givenName: 'Joe',
    };
    const spy = spyOn(component, 'logout');
    fixture.detectChanges();
    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    const menu = await loader.getHarness<MatMenuHarness>(
      MatMenuHarness.with({
        selector: `#open-menu`,
      })
    );
    await menu.open();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#logout'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });
});
