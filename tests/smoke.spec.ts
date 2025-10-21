import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main heading', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Compliante Solutions/);
    await expect(page.locator('h1')).toContainText('Your Complete Healthcare Business Partner');
  });

  test('should display navigation and CTA', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Partners' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Request a Practice Analysis/i })).toBeVisible();
  });

  test('should display partner grid', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('AlzBetter')).toBeVisible();
    await expect(page.getByText('SmartFit')).toBeVisible();
    await expect(page.getByText('Healthy Senior Lighting')).toBeVisible();
    await expect(page.getByText('Rudio')).toBeVisible();
  });
});

test.describe('Services Pages', () => {
  test('should load services overview page', async ({ page }) => {
    await page.goto('/services');
    
    await expect(page.locator('h1')).toContainText('Complete Healthcare Solutions');
    await expect(page.getByText('Regulatory Compliance')).toBeVisible();
    await expect(page.getByText('Revenue Optimization')).toBeVisible();
    await expect(page.getByText('Risk Management')).toBeVisible();
  });

  test('should load compliance service page', async ({ page }) => {
    await page.goto('/services/compliance');
    
    await expect(page).toHaveTitle(/Healthcare Compliance/);
    await expect(page.locator('h1')).toContainText('Regulatory Compliance');
    await expect(page.getByText('HIPAA Compliance Solutions')).toBeVisible();
  });

  test('should load revenue optimization page', async ({ page }) => {
    await page.goto('/services/revenue-optimization');
    
    await expect(page).toHaveTitle(/Revenue Optimization/);
    await expect(page.locator('h1')).toContainText('Revenue Optimization');
  });

  test('should load risk management page', async ({ page }) => {
    await page.goto('/services/risk-management');
    
    await expect(page).toHaveTitle(/Risk Management/);
    await expect(page.locator('h1')).toContainText('Risk Management');
  });
});

test.describe('Partner Pages', () => {
  test('should load partners overview page', async ({ page }) => {
    await page.goto('/partners');
    
    await expect(page.locator('h1')).toContainText('Innovation Partners');
  });

  test('should load AlzBetter partner page', async ({ page }) => {
    await page.goto('/partners/alzbetter');
    
    await expect(page).toHaveTitle(/AlzBetter/);
    await expect(page.locator('h1')).toContainText('AlzBetter');
  });
});

test.describe('Other Pages', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.locator('h1')).toContainText('About Compliante Solutions');
    await expect(page.getByText('Charlotte H. Lowder')).toBeVisible();
    await expect(page.getByText('Robert W. Lowder')).toBeVisible();
  });

  test('should load contact page with form', async ({ page }) => {
    await page.goto('/contact');
    
    await expect(page.locator('h1')).toContainText('Contact Us');
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
  });
});