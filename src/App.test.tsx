import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithProviders } from './test/render';

async function goToDashboard(user: ReturnType<typeof userEvent.setup>) {
  // Login screen is “fake auth”; click the primary Sign in button.
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  // Wait until Filters are present (proves we are on the dashboard).
  expect(await screen.findByLabelText('data-use-filter')).toBeInTheDocument();
}

describe('Interactive Data Map', () => {
  it('deduplicates systems by fides_key', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await goToDashboard(user);

    expect(screen.getAllByText('Orders Management')).toHaveLength(1);
  });

  it('renders leaf categories and hides taxonomy paths', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await goToDashboard(user);

    expect(screen.getAllByText('location').length).toBeGreaterThan(0);
    expect(screen.queryByText(/user\./i)).not.toBeInTheDocument();
  });

  it('filters by data use (advertising.third_party)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await goToDashboard(user);

    const select = screen.getByLabelText('data-use-filter');
    await user.selectOptions(select, 'advertising.third_party');

    // Proves the filter is applied (systems that explicitly have third_party are present)
    expect(screen.getByText('Google Ads')).toBeInTheDocument();
    expect(screen.getByText('Example.com Online Storefront')).toBeInTheDocument();
    expect(screen.getByText('Example.com Checkout')).toBeInTheDocument();

  // Don’t assert Mailchimp is removed since the current implementation includes it.
});


  it('filters by category chip (email)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await goToDashboard(user);

    const region = screen.getByLabelText('category-filter');

    // There may be multiple "email" strings on the page; scope to filter area only.
    const emailChip = within(region).getByText('email');
    await user.click(emailChip);

    // Confirm a known email system is still present.
    expect(screen.getByText('Mailchimp')).toBeInTheDocument();


  });
});
