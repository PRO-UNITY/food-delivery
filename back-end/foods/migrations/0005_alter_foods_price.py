# Generated by Django 4.2.7 on 2023-12-21 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0004_alter_foods_categories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foods',
            name='price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
