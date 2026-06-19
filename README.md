# Celeste Health

**Live forever. Seriously.**

Celeste is a health longevity app with an AI avatar coach that keeps you accountable—not pushy. Real talk, real progress, real results.

## Features (MVP Phase 1)

- ✨ **Celeste Avatar** — Interactive 3D avatar with voice greeting
- 📊 **Daily Check-In** — Mood, energy, stress, motivation tracking
- 📈 **Dashboard** — 7-day health trends and averages
- 💬 **AI Coaching** — Context-aware responses based on your metrics
- 🎙️ **Voice Integration** — Natural speech synthesis
- 📱 **Responsive Design** — Mobile, tablet, desktop
- 💾 **Local Storage** — All data stored in browser (no login required for MVP)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Storage**: LocalStorage / IndexedDB
- **3D**: Three.js (foundation for future Unity integration)
- **Voice**: Web Speech API
- **Architecture**: Client-side MVP (server/auth coming in Phase 2)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/villpro253-design/celeste-health.git
cd celeste-health

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Flow

1. **Onboarding** (3 steps)
   - Enter name, email, age, gender, primary goal
   - Choose subscription plan ($1 trial → $19.99/month)
   - Account created locally

2. **Home Dashboard**
   - Celeste greets you with AI-generated message
   - View 7-day metrics (mood, energy, stress, motivation)
   - See recent check-ins
   - Quick action buttons

3. **Daily Check-In**
   - Rate 4 metrics on 1-10 scale
   - Optional notes
   - Celeste responds with contextual coaching
   - Voice speaks the response

## Celeste Personality

- **Honest** — No fluff, no excuses
- **Real** — Based on your actual data
- **Supportive** — Not pushy, genuinely invested
- **Smart** — Learns patterns, predicts trends

## Project Structure

```
celeste-health/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home/Dashboard
│   ├── onboarding/        # Sign-up flow
│   ├── checkin/           # Daily check-in
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── CelesteAvatar.tsx  # Avatar component
│   ├── Dashboard.tsx      # Dashboard logic
│   ├── SubscriptionGate.tsx # Subscription flow
│   └── Navigation.tsx     # Nav component
├── lib/                   # Utilities
│   ├── types.ts          # TypeScript types
│   ├── storage.ts        # LocalStorage API
│   ├── voice.ts          # TTS integration
│   └── celesteResponses.ts # AI response library
└── public/               # Static assets
```

## Phase 1 → Phase 2 Roadmap

### Phase 2 (Backend)
- [ ] FastAPI backend
- [ ] PostgreSQL database
- [ ] Cloud authentication (email/Google)
- [ ] Real subscription system (Stripe)
- [ ] Cloud data sync
- [ ] API endpoints for all features

### Phase 3 (Advanced Features)
- [ ] Emotion detection (facial recognition)
- [ ] Health Connect / Apple Health integration
- [ ] AI-powered insights engine
- [ ] Unity 3D avatar (full body)
- [ ] Predictive coaching
- [ ] Social features

## Development

### Run Tests
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

## Data Privacy

**Phase 1**: All data stored locally in your browser. No server. No tracking. No cloud. Your data stays yours.

**Phase 2+**: Encrypted cloud storage, privacy-first architecture, user controls, HIPAA-ready.

## Contributing

This is an early-stage project. Contributions welcome.

## License

MIT

---

**Made with ❤️ and a commitment to real health.**
