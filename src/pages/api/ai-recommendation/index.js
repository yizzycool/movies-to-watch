import { GoogleGenerativeAI } from '@google/generative-ai';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import _join from 'lodash/join';
import _split from 'lodash/split';
import _trim from 'lodash/trim';

// const modelType = 'gemini-1.5-flash';
const modelType = 'gemini-1.5-flash-8b';
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 500,
  responseMimeType: 'text/plain',
};

const model = genAI.getGenerativeModel({
  model: modelType,
  generationConfig,
  systemInstruction:
    'You are a movie recommendation assistant. You must respond to user queries by recommending exactly 10 movies based on the user\'s watchlist, selected genres, and current moods. Your responses should be in a bullet-point format, providing concise recommendations without any additional explanations or commentary. Do not include introductory or closing remarks. Only list the movie titles for each recommendation.\n\nConstraints:\nDo not recommend any movies that are already in the user\'s watchlist.\nRecommend movies that match the user\'s selected genres and current moods.\nFactors to Consider:\nThe user\'s watchlist: List the movies the user has marked as "to-watch," including their corresponding genres. For example:\n"Star Wars: The Rise of Skywalker" - Genres: Science Fiction, Adventure\n"Avengers: Endgame" - Genres: Action, Science Fiction\n"Harry Potter: The Sorcerer\'s Stone" - Genres: Fantasy, Adventure\nThe user\'s selected genres: The user can choose multiple movie genres they currently prefer (e.g., Romance, Mystery, Adventure, etc.). Please consider these multiple genres when filtering the recommended movies.\nThe user\'s current mood: The user\'s mood description can include multiple moods (e.g., Happy, Sad, Anxious, Excited, etc.). Please consider these multiple moods when recommending movies.\nBased on these three inputs, recommend suitable movies for the user, ensuring that no movie already listed in the watchlist is included in your recommendations.\n\nInput Format:\n- User\'s watchlist:\n  - "Star Wars: The Rise of Skywalker" - Genre: Sci-Fi, Adventure\n  - "Avengers: Endgame" - Genre: Action, Sci-Fi\n  - "Harry Potter: The Sorcerer\'s Stone" - Genre: Fantasy, Adventure\n- User\'s selected genres: Sci-Fi, Adventure\n- User\'s current moods: Excited, Happy\n\nOutput Format:\n- Blade Runner 2049\n- Avengers: Endgame\n- Star Wars: A New Hope\n- Guardians of the Galaxy\n- The Fifth Element\n- Ready Player One\n- Jurassic Park\n- Inception\n- Tron: Legacy\n- Dune',
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

// Only accept POST request for now,
// other request methods will get error 405 response!
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // payload
    // { watchlist, selectedGenres, currentMoods}
    const body = req.body;
    try {
      const aiRecommendedData = await inference(body);
      res.status(200).json({ recommendations: aiRecommendedData });
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
}

async function inference({ watchlist, selectedGenres, currentMoods }) {
  const prompt = generatePrompt(watchlist, selectedGenres, currentMoods);
  const result = await model.generateContent(prompt);
  const top10 = postProcess(result.response.text());
  return top10;
}

// Input format:
// - User's watchlist:
//   - "Star Wars: The Rise of Skywalker" - Genres: Sci-Fi, Adventure
//   - "Avengers: Endgame" - Genres: Action, Sci-Fi
//   - "Harry Potter: The Sorcerer's Stone" - Genres: Fantasy, Adventure
// - User's selected genres: Sci-Fi, Adventure
// - User's current moods: Excited, Happy
//
function generatePrompt(watchlist, selectedGenres, currentMoods) {
  const watchlistData = _map(watchlist, (list) => {
    return `  - "${_get(list, 'title', '')}" - Genres: ${_join(_get(list, 'genres', []), ', ')}`;
  });
  const prompt = `- User's watchlist:\n${_join(watchlistData, '\n')}\n- User's selected genres: ${_join(selectedGenres, ', ')}\n- User's current moods: ${_join(currentMoods, ', ')}`;
  return prompt;
}

// Transform string into list
function postProcess(text) {
  const recommendList = _split(text, '\n');
  const clearedList = _map(recommendList, (str) => _trim(str, ' -'));
  return _filter(clearedList, (str) => !_isEmpty(str));
}
