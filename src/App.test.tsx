import { screen, within } from '@testing-library/react';
import { renderWithProviders } from './test/render';

import userEvent from '@testing-library/user-event';
import App from './App';

describe('Interactive Data Map', () => {
  it('dedupes systems by fides_key (Orders Management renderWithProviders once)', () => {
    renderWithProviders(<App />);

    const matches = screen.getAllByText('Orders Management');
    expect(matches).toHaveLength(1);
  });

  it('shows leaf data categories and does not renderWithProviders full taxonomy paths', () => {
    renderWithProviders(<App />);

    // leaf label should appear somewhere
    expect(screen.getAllByText('location').length).toBeGreaterThan(0);

    // taxonomy paths should not be visible in the UI
    expect(screen.queryByText(/user\./i)).not.toBeInTheDocument();
  });

  it('filters by data use (advertising.third_party)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    // Find the select by its label text from your Filters panel
    // If your UI label differs, adjust this string to match.
    const useLabel = screen.getByText(/filter by data use/i);
    const panel = useLabel.closest('div') ?? document.body;

    const select = within(panel).getByRole('combobox');
    await user.selectOptions(select, 'advertising.third_party');

    // Expected visible
    expect(screen.getByText('Google Ads')).toBeInTheDocument();
    expect(screen.getByText('Example.com Online Storefront')).toBeInTheDocument();
    expect(screen.getByText('Example.com Checkout')).toBeInTheDocument();

    // Expected hidden (no third-party ads use)
    expect(screen.queryByText('Mailchimp')).not.toBeInTheDocument();
  });

  it('filters by category chip (email)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    // Click the email category chip/tag
    // If your chip is a Tag with clickable behavior, it should be in the document.
    const categoryRegion = screen.getByLabelText('category-filter');
    const emailChip = within(categoryRegion).getByText('email');
    await user.click(emailChip);

    // Expected systems with email (based on your sample data):
    expect(screen.getByText('Example.com Online Storefront')).toBeInTheDocument();
    expect(screen.getByText('Example.com Checkout')).toBeInTheDocument();
    expect(screen.getByText('Mailchimp')).toBeInTheDocument();
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Ethyca')).toBeInTheDocument();

    // A system with no declarations should not appear
    expect(screen.queryByText('Example.com Search Engine')).not.toBeInTheDocument();
  });
});
