from django.core.management.base import BaseCommand
from api.data_insert import insert_initial_data

class Command(BaseCommand):
    help = 'Cargar data de prueba en la base de datos'

    def handle(self, *args, **options):
        insert_initial_data()
        self.stdout.write(self.style.SUCCESS('Data cargada satisfactoriamente!'))
