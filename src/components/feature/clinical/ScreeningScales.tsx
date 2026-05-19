import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface QuestionProps {
  number: number;
  question: string;
  id: string;
  value: number;
  onChange: (id: string, value: number) => void;
}

const Question = ({ number, question, id, value, onChange }: QuestionProps) => (
  <div className="space-y-4">
    <p className="text-[11px] font-bold text-foreground leading-relaxed">
      {number}. {question}
    </p>
    <div className="space-y-2">
      {['Nunca', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={id}
              checked={value === idx}
              onChange={() => onChange(id, idx)}
              className="peer appearance-none w-4 h-4 border border-border rounded-full checked:border-primary transition-all cursor-pointer transition-colors duration-300"
            />
            <div className="absolute w-2 h-2 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export interface ScreeningData {
  [key: string]: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
}

interface ScreeningScalesProps {
  value: ScreeningData;
  onChange: (data: ScreeningData) => void;
}

export const ScreeningScales = ({ value, onChange }: ScreeningScalesProps) => {
  const handleQuestionChange = (id: string, questionValue: number) => {
    onChange({
      ...value,
      [id]: questionValue
    });
  };

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-foreground">Escalas de Tamizaje</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium">Criterios preliminares y síntomas detectados para el caso.</p>
      </CardHeader>

      <CardContent className="p-0 space-y-10">
        <Question
          number={1}
          question="¿Con qué frecuencia ha tenido poco interés o placer en hacer cosas?*"
          id="q1"
          value={value.q1}
          onChange={handleQuestionChange}
        />
        <Question
          number={2}
          question="¿Con qué frecuencia se ha sentido desanimado, deprimido o sin esperanza?*"
          id="q2"
          value={value.q2}
          onChange={handleQuestionChange}
        />
        <Question
          number={3}
          question="¿Ha experimentado problemas para dormir o dormir demasiado?*"
          id="q3"
          value={value.q3}
          onChange={handleQuestionChange}
        />
        <Question
          number={4}
          question="¿Se ha sentido cansado o con poca energía?*"
          id="q4"
          value={value.q4}
          onChange={handleQuestionChange}
        />
        <Question
          number={5}
          question="¿Se ha sentido sin apetito o ha comido en exceso?*"
          id="q5"
          value={value.q5}
          onChange={handleQuestionChange}
        />
        <Question
          number={6}
          question="¿Se ha sentido mal con usted mismo(a) - o que es un fracaso o que ha quedado mal con usted mismo(a) o con su familia?*"
          id="q6"
          value={value.q6}
          onChange={handleQuestionChange}
        />
        <Question
          number={7}
          question="¿Que tan frecuentemente ha tenido dificultad para concentrarse en ciertas actividades, tales como leer el periódico o ver la televisión?*"
          id="q7"
          value={value.q7}
          onChange={handleQuestionChange}
        />
        <Question
          number={8}
          question="¿Se ha movido o hablado tan lento que otras personas podrían haberlo notado? o lo contrario - muy inquieto(a) o agitado(a) que ha estado moviéndose mucho más de lo normal*"
          id="q8"
          value={value.q8}
          onChange={handleQuestionChange}
        />
        <Question
          number={9}
          question="¿Que tan frecuentemente ha tenido pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera?*"
          id="q9"
          value={value.q9}
          onChange={handleQuestionChange}
        />
      </CardContent>
    </Card>
  );
};
