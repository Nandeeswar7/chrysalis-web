export interface Dish {
    id: string;
    name: string;
    ingredients: string;
    diet: 'vegetarian' | 'non vegetarian';
    prep_time: string;
    cook_time: string;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
  }
  