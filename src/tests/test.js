// Example test file (test.ts)
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleProvider } from '../context/articles/context'; // Example context import
import LiveArticles from '/home/godlord/capstone301/sportnewsapp/src/pages/home/Article.tsx';

describe('LiveArticles Component', () => {
  test('renders articles based on user preferences', async () => {
    render(
      <ArticleProvider>
        <LiveArticles />
      </ArticleProvider>
    );

    expect(await screen.findByText('First Article')).toBeInTheDocument();
    expect(screen.getByText('Second Article')).toBeInTheDocument();
  });

  test('filters articles based on selected sport', async () => {
    render(
      <ArticleProvider>
        <LiveArticles />
      </ArticleProvider>
    );

    fireEvent.change(screen.getByLabelText(/Filter by sports/i), { target: { value: 'Football' } });
    expect(await screen.findByText('First Article')).toBeInTheDocument();
    expect(screen.queryByText('Second Article')).not.toBeInTheDocument();
  });
});
