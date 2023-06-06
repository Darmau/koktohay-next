export async function addPageView(url: string): Promise<number> {
  try {
    const response = await fetch(`/api/pageview?link=${url}`, {
      method: 'PUT',
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error adding page view:', error);
    return 0;
  }
}

export async function getPageView(url: string): Promise<number> {
  try {
    const response = await fetch(`/api/pageview?link=${url}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error getting page view:', error);
    return 0;
  }
}